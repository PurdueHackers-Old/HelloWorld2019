import { Request } from 'express';
import { ObjectId } from 'mongodb';
import {
	JsonController,
	Get,
	QueryParam,
	Param,
	BadRequestError,
	Put,
	Req,
	Body,
	CurrentUser,
	UnauthorizedError,
	Post,
	Authorized,
	Params
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { User, UserDto, IUserModel } from '../models/user';
import { ApplicationDto, Application } from '../models/application';
import { userMatches, hasPermission } from '../utils';
import { Role } from '../../shared/user.enums';
import { Inject } from 'typedi';
import { GlobalsController } from './globals.controller';
import { ApplicationsStatus } from '../../shared/globals.enums';
import { storageService } from '../services/storage.service.ts'

@JsonController('/api/users')
export class UserController extends BaseController {

	constructor(private storageService?: storageService) {
		super();
	}

	@Inject() globalController: GlobalsController;

	@Get('/')
	@Authorized([Role.EXEC])
	async getAll(@QueryParam('sortBy') sortBy?: string, @QueryParam('order') order?: number) {
		order = order === 1 ? 1 : -1;
		sortBy = sortBy || 'createdAt';

		let contains = false;
		User.schema.eachPath(path => {
			if (path.toLowerCase() === sortBy.toLowerCase()) contains = true;
		});
		if (!contains) sortBy = 'createdAt';

		const results = await User.find()
			.sort({ [sortBy]: order })
			.lean()
			.exec();

		return { users: results };
	}

	@Get('/:id/application')
	@Authorized()
	async getUserApplication(@Param('id') id: string, @CurrentUser() currentUser: IUserModel) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid user ID');
		if (!userMatches(currentUser, id, true))
			throw new UnauthorizedError('You are unauthorized to view this application');
		const user = await User.findById(id)
			.lean()
			.exec();
		if (!user) throw new BadRequestError('User does not exist');

		const appQuery = Application.findOne({ user }).populate('user');
		if (hasPermission(currentUser, Role.EXEC)) appQuery.select('+statusInternal');

		const application = await appQuery.exec();
		return application;
	}

	// TODO: Add tests
	@Get('/application')
	@Authorized()
	async getOwnApplication(@CurrentUser() currentUser: IUserModel) {
		const application = await Application.findOne({ user: currentUser })
			.populate('user')
			.exec();
		return application;
	}

	// Regex because route clashes with get application route above ^
	// Get('/:id')
	@Get(/\/((?!application)[a-zA-Z0-9]+)$/)
	@Authorized([Role.EXEC])
	async getById(@Params() params: string[]) {
		const id = params[0];
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid user ID');
		const user = await User.findById(id)
			.lean()
			.exec();

		if (!user) throw new BadRequestError('User does not exist');
		return user;
	}

	// TODO: Add tests
	@Put('/:id')
	@Authorized()
	async updateById(
		@Param('id') id: string,
		@Body() userDto: UserDto,
		@CurrentUser({ required: true }) currentUser: IUserModel
	) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid user ID');
		if (!userMatches(currentUser, id))
			throw new UnauthorizedError('You are unauthorized to edit this profile');
		let user = await User.findById(id, '+password').exec();
		if (!user) throw new BadRequestError('User not found');

		user = await User.findByIdAndUpdate(id, userDto, { new: true })
			.lean()
			.exec();
		return user;
	}

	@Post('/:id/apply')
	@Authorized()
	async apply(
		@Req() req: Request,
		@Param('id') id: string,
		@Body() applicationDto: ApplicationDto,
		@CurrentUser({ required: true }) currentUser: IUserModel
	) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid user ID');
		const user = await User.findById(id).exec();
		if (!user) throw new BadRequestError('User not found');
		if (!userMatches(currentUser, id))
			throw new UnauthorizedError('You are unauthorized to edit this application');

		const globals = await this.globalController.getGlobals();
		const closed =
			currentUser.role === Role.ADMIN
				? false
				: globals.applicationsStatus === ApplicationsStatus.CLOSED;

		if (closed) throw new UnauthorizedError('Sorry, applications are closed!');

		const appQuery = Application.findOneAndUpdate(
			{ user },
			{ ...applicationDto, user },
			{
				new: true,
				upsert: true,
				setDefaultsOnInsert: true
			}
		).populate('user');
		if (hasPermission(currentUser, Role.EXEC)) appQuery.select('+statusInternal');

		const files: Express.Multer.File[] = req.files
			? (req.files as Express.Multer.File[])
			: new Array<Express.Multer.File>();

		const resume = files.find(file => file.fieldname === 'resume');
		if (resume) {
			try {
				applicationDto.resume = await this.storageService.uploadToStorage(
					resume,
					'resumes',
					applicationDto
				);
			} catch (error) {
				this.logger.emerg('Error uploading resume:', error);
				throw new BadRequestError('Something is wrong! Unable to upload at the moment!');
			}
		}

		const app = await appQuery.exec();
		user.application = app;
		await user.save();
		return app;
	}
}
