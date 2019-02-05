import { ObjectId } from 'mongodb';
import { userMatches, multer } from '../utils';
import {
	JsonController,
	Get,
	QueryParam,
	Param,
	BadRequestError,
	Body,
	UseBefore,
	CurrentUser,
	UnauthorizedError,
	UseAfter,
	Post,
	Authorized
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { ValidationMiddleware } from '../middleware/validation';
import { Application, ApplicationDto } from '../models/application';
import { IUserModel, Role } from '../models/user';

@JsonController('/api/applications')
@UseAfter(ValidationMiddleware)
export class ApplicationController extends BaseController {
	@Get('/')
	@Authorized([Role.EXEC])
	async getAll(@QueryParam('sortBy') sortBy?: string, @QueryParam('order') order?: number) {
		order = order === 1 ? 1 : -1;
		sortBy = sortBy || 'createdAt';

		let contains = false;
		Application.schema.eachPath(path => {
			if (path.toLowerCase() === sortBy.toLowerCase()) contains = true;
		});
		if (!contains) sortBy = 'createdAt';

		const results = await Application.find()
			.sort({ [sortBy]: order })
			.lean()
			.exec();

		return { applications: results };
	}

	@Get('/:id')
	async getById(@Param('id') id: string) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid application ID');
		const application = await Application.findById(id)
			.lean()
			.exec();
		if (!application) throw new BadRequestError('Application does not exist');
		return application;
	}
}
