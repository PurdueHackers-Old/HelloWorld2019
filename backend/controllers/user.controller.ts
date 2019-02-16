import { ObjectId } from 'mongodb';
import { User, UserDto, IUserModel, Role } from '../models/user';
import { userMatches, multer, hasPermission } from '../utils';
import {
	JsonController,
	Get,
	QueryParam,
	Param,
	BadRequestError,
	Put,
	Body,
	UseBefore,
	CurrentUser,
	UnauthorizedError,
	UseAfter,
	Post,
	Authorized,
	Params
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { ValidationMiddleware } from '../middleware/validation';
import { ApplicationDto, Application } from '../models/application';

@JsonController('/api/users')
@UseAfter(ValidationMiddleware)
export class UserController extends BaseController {
	// TODO: Add tests
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
		// const application = Application.findOne({ user })
		// 	.populate('user')
		// 	.exec();

		const appQuery = Application.findOne({ user }).populate('user');
		if (hasPermission(currentUser, Role.EXEC)) appQuery.select('+statusInternal');

		const application = await appQuery.exec();
		return application;
	}

	// TODO: Add tests
	@Get('/application')
	@Authorized()
	async getOwnApplication(@CurrentUser() currentUser: IUserModel) {
		this.logger.info('Getting application');
		const application = Application.findOne({ user: currentUser })
			.populate('user')
			.exec();
		return application;
	}

	// Regex because route clashes with get application route above ^
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
	@UseBefore(multer.any())
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
	@UseBefore(multer.any())
	async apply(
		@Param('id') id: string,
		@Body() applicationDto: ApplicationDto,
		@CurrentUser({ required: true }) currentUser: IUserModel
	) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid user ID');
		const user = await User.findById(id).exec();
		if (!user) throw new BadRequestError('User not found');
		if (!userMatches(currentUser, id))
			throw new UnauthorizedError('You are unauthorized to edit this application');

		const appQuery = Application.findOneAndUpdate(
			{ user },
			{ ...applicationDto, user },
			{
				upsert: true,
				setDefaultsOnInsert: true,
				new: true
			}
		).populate('user');
		if (hasPermission(currentUser, Role.EXEC)) appQuery.select('+statusInternal');

		const app = await appQuery.exec();
		return app;
	}
}
