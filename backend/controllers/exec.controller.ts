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
	Param
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { ValidationMiddleware } from '../middleware/validation';
import { Application } from '../models/application';
import { Status } from '../../shared/app.enums';
import { Role } from '../../shared/user.enums';
import { User } from '../models/user';

@JsonController('/api/exec')
@UseAfter(ValidationMiddleware)
export class ExecController extends BaseController {
	@Post('/checkin/:id')
	@Authorized([Role.EXEC])
	async checkin(@Param('id') id: string) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid application ID');
		const user = await User.findById(id).exec();
		if (!user) throw new BadRequestError('User does not exist');
		user.checkedin = true;
		await user.save();
		return user;
	}
}
