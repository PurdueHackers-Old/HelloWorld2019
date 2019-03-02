import { ObjectId } from 'mongodb';
import {
	JsonController,
	Get,
	QueryParam,
	BadRequestError,
	UseAfter,
	Authorized,
	Params,
	Post,
	BodyParam,
	Req,
	Param
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { ValidationMiddleware } from '../middleware/validation';
import { Application } from '../models/application';
import { Status } from '../../shared/app.enums';
import { Role } from '../../shared/user.enums';
import { escapeRegEx } from '../utils';

@JsonController('/api/applications')
@UseAfter(ValidationMiddleware)
export class ApplicationController extends BaseController {
	@Get('/')
	@Authorized([Role.EXEC])
	async getAll(
		@QueryParam('filter') filter: any = {},
		@QueryParam('page') page: number = 1,
		@QueryParam('limit') limit: number = 10,
		@QueryParam('sort') sort: { [x: string]: number } = {}
	) {
		const skip = limit * (page - 1);

		Object.entries(filter).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				if (value.length) filter[key] = { $in: value };
				else delete filter[key];
			} else if (key === 'name' || key === 'email')
				filter[key] = new RegExp(escapeRegEx(value as string), 'i');
		});

		const resultsQuery = Application.aggregate([
			{
				$lookup: {
					from: 'users',
					let: { user_id: '$user' },
					as: 'user',
					pipeline: [
						{
							$match: { $expr: { $eq: ['$_id', '$$user_id'] } }
						},
						{
							$project: {
								_id: 0,
								name: 1,
								email: 1
							}
						}
					]
				}
			},
			{
				$replaceRoot: {
					newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] }
				}
			},
			{ $project: { user: 0 } },
			{ $match: filter },
			{
				$facet: {
					applications: [
						{
							$sort: {
								...sort,
								createdAt: 1
							}
						},
						{ $skip: skip },
						{ $limit: limit }
					],
					pagination: [
						{ $count: 'total' },
						{
							$addFields: {
								pageSize: limit,
								page,
								pages: { $ceil: { $divide: ['$total', limit] } }
							}
						}
					]
				}
			},
			{ $unwind: '$pagination' }
		]);

		const [results] = await resultsQuery.exec();
		return results;
	}

	// TODO: Add tests
	@Get('/stats')
	@Authorized([Role.EXEC])
	async getStats() {
		const [total, pending, accepted, rejected, waitlist] = await Promise.all([
			Application.countDocuments({}).exec(),
			Application.countDocuments({ statusInternal: Status.PENDING }).exec(),
			Application.countDocuments({ statusInternal: Status.ACCEPTED }).exec(),
			Application.countDocuments({ statusInternal: Status.REJECTED }).exec(),
			Application.countDocuments({ statusInternal: Status.WAITLIST }).exec()
		]);

		return {
			total,
			pending,
			accepted,
			rejected,
			waitlist
		};
	}

	// TODO: Add tests
	@Get(/\/((?!stats)[a-zA-Z0-9]+)$/)
	@Authorized([Role.EXEC])
	async getById(@Params() params: string[]) {
		const id = params[0];
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid application ID');
		const application = await Application.findById(id)
			.populate('user')
			.select('+statusInternal')
			.lean()
			.exec();
		if (!application) throw new BadRequestError('Application does not exist');
		return application;
	}

	// TODO: Add tests
	@Post('/:id/status')
	@Authorized([Role.EXEC])
	async updateStatus(@Param('id') id: string, @BodyParam('status') status: string) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid application ID');
		const application = await Application.findByIdAndUpdate(
			id,
			{ statusInternal: status },
			{ new: true }
		)
			.populate('user')
			.select('+statusInternal')
			.lean()
			.exec();
		if (!application) throw new BadRequestError('Application does not exist');
		return application;
	}
}
