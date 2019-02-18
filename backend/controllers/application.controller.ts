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
import { Status } from '../../shared/app.enums';
import { Role } from '../../shared/user.enums';

@JsonController('/api/applications')
@UseAfter(ValidationMiddleware)
export class ApplicationController extends BaseController {
	@Get('/')
	@Authorized([Role.EXEC])
	async getAll(
		@QueryParam('sortBy') sortBy?: string,
		@QueryParam('order') order?: number,
		@QueryParam('status') status?: string,
		@QueryParam('select') select?: string
	) {
		order = order === 1 ? 1 : -1;
		sortBy = sortBy || 'createdAt';

		let contains = false;
		Application.schema.eachPath(path => {
			if (path.toLowerCase() === sortBy.toLowerCase()) contains = true;
		});
		if (!contains) sortBy = 'createdAt';

		const conditions = status ? { statusPublic: status } : {};

		const resultsQuery = Application.find(conditions)
			.sort({ [sortBy]: order })
			.populate('user', 'name email')
			.select('+statusInternal')
			.lean();

		const results = await resultsQuery.exec();

		return { applications: results };
	}

	// TODO: Add tests
	@Get('/stats')
	@Authorized([Role.EXEC])
	async getStats() {
		const [total, pending, accepted, rejected, waitlist] = await Promise.all([
			Application.countDocuments({}).exec(),
			Application.countDocuments({ status: Status.PENDING }).exec(),
			Application.countDocuments({ status: Status.ACCEPTED }).exec(),
			Application.countDocuments({ status: Status.REJECTED }).exec(),
			Application.countDocuments({ status: Status.WAITLIST }).exec()
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
