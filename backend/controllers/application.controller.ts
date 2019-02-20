import { ObjectId } from 'mongodb';
import {
	JsonController,
	Get,
	QueryParam,
	BadRequestError,
	UseAfter,
	Authorized,
	Params
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { ValidationMiddleware } from '../middleware/validation';
import { Application } from '../models/application';
import { Status, Gender } from '../../shared/app.enums';
import { Role } from '../../shared/user.enums';
import { User } from '../models/user';

@JsonController('/api/applications')
@UseAfter(ValidationMiddleware)
export class ApplicationController extends BaseController {
	@Get('/')
	@Authorized([Role.EXEC])
	async getAll(
		@QueryParam('sort') sort: string = 'createdAt',
		@QueryParam('filter') filter: any = {},
		@QueryParam('page') page: number = 1,
		@QueryParam('limit') limit: number = 10,
		@QueryParam('order') order?: number
	) {
		order = order === 1 ? 1 : -1;
		const skip = limit * (page - 1);

		const paths = Object.keys((Application.schema as any).paths);
		const contains = paths.some(path => path.toLowerCase() === sort.toLowerCase());
		if (!contains) sort = 'createdAt';

		Object.entries(filter).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				if (value.length) filter[key] = { $in: value };
				else delete filter[key];
			}
		});

		// filter.gender = {
		// 	$in: [Gender.FEMALE]
		// };

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
			{ $sort: { [sort]: order } },
			{ $match: filter },
			{
				$facet: {
					applications: [
						{ $sort: { [sort]: order } },
						{ $skip: skip },
						{ $limit: limit }
					],
					pagination: [
						{ $count: 'total' },
						{ $addFields: { pageSize: limit, current: page } }
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
	// @Get('/:id')
	@Get(/\/((?!stats)[a-zA-Z0-9]+)$/)
	async getById(@Params() params: string[]) {
		const id = params[0];
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid application ID');
		const application = await Application.findById(id)
			.lean()
			.exec();
		if (!application) throw new BadRequestError('Application does not exist');
		return application;
	}
}
