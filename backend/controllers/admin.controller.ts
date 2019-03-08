import {
	JsonController,
	Get,
	QueryParam,
	BadRequestError,
	Authorized,
	Post,
	BodyParam
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { Role } from '../../shared/user.enums';
import { User } from '../models/user';
import { escapeRegEx } from '../utils';

@JsonController('/api/admin')
export class AdminController extends BaseController {
	// TODO: Add tests
	@Get('/users')
	@Authorized([Role.ADMIN])
	async getUsers(@QueryParam('email') email: string = '') {
		const query = { email: new RegExp(escapeRegEx(email), 'i') };
		const results = await User.find(query)
			.limit(10)
			.exec();
		return results;
	}

	@Post('/role')
	@Authorized([Role.ADMIN])
	async updateRole(@BodyParam('email') email?: string, @BodyParam('role') r?: string) {
		if (!email) throw new BadRequestError('Please provide an email');

		const role = Object.values(Role).find(ro => ro === r);
		if (!role) throw new BadRequestError('Invalid Role');

		const user = await User.findOne({ email }).exec();
		if (!user) throw new BadRequestError(`There is no user with email: ${email}`);

		user.role = role;
		await user.save();
		return user;
	}
}
