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
import { escapeRegEx } from '../utils';

@JsonController('/api/exec')
@UseAfter(ValidationMiddleware)
export class ExecController extends BaseController {
	@Post('/checkin/:email')
	@Authorized([Role.EXEC])
	async checkin(@Param('email') email: string) {
		const user = await User.findOne({ email }).exec();
		if (!user) throw new BadRequestError(`There is no user with email: ${email}`);
		user.checkedin = true;
		await user.save();
		return user;
	}

	@Get('/checkin')
	@Authorized([Role.EXEC])
	async getCheckin(@QueryParam('email') email?: string) {
		const match: any = { $match: { checkedin: false } };
		if (email) match.$match.email = new RegExp(escapeRegEx(email), 'i');

		const results = await User.aggregate([
			match,
			{
				$lookup: {
					from: 'applications',
					localField: '_id',
					foreignField: 'user',
					as: 'application'
				}
			},
			{
				$unwind: {
					path: '$application',
					preserveNullAndEmptyArrays: true
				}
			},
			{ $match: { 'application.statusPublic': Status.ACCEPTED } },
			{ $project: { _id: 1, name: 1, email: 1 } }
		]);
		return results;
	}
}
