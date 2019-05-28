import {
	JsonController,
	Get,
	Authorized,
	Post,
	BodyParam,
	BadRequestError,
	Body
} from 'routing-controllers';
import { PushSubscription } from 'web-push';
import CONFIG from '../config';
import { BaseController } from './base.controller';
import { Role } from '../../shared/user.enums';
import { ApplicationsStatus } from '../../shared/globals.enums';
import { Globals, IGlobalsModel } from '../models/globals';
import { NotificationService } from '../services/notification.service';
import { Application } from '../models/application';

@JsonController('/api/globals')
export class GlobalsController extends BaseController {
	constructor(private notificationService?: NotificationService) {
		super();
	}

	@Get('/')
	async getGlobals() {
		const globals: IGlobalsModel = await Globals.findOneAndUpdate(
			{},
			{},
			{ upsert: true, setDefaultsOnInsert: true, new: true }
		)
			.lean()
			.exec();
		return globals;
	}

	// TODO: Add tests
	@Post('/status')
	@Authorized([Role.ADMIN])
	async updateApplicationsStatus(@BodyParam('status') s: string) {
		const status = Object.values(ApplicationsStatus).find(stat => stat === s);
		if (!status) throw new BadRequestError('Invalid status');
		const globals: IGlobalsModel = await Globals.findOneAndUpdate(
			{},
			{ applicationsStatus: status },
			{ upsert: true, setDefaultsOnInsert: true, new: true }
		)
			.lean()
			.exec();
		return globals;
	}

	// TODO: Add tests
	@Post('/public')
	@Authorized([Role.ADMIN])
	async makeApplicationsPublic(@BodyParam('status') status: boolean) {
		const globals: IGlobalsModel = await Globals.findOneAndUpdate(
			{},
			{ applicationsPublic: status },
			{ upsert: true, setDefaultsOnInsert: true, new: true }
		)
			.lean()
			.exec();

		await Application.aggregate([
			{ $addFields: { statusPublic: '$statusInternal' } },
			{ $out: 'applications' }
		]);

		return globals;
	}

	@Get('/vapid-public-key')
	getVapidPublicKey() {
		return CONFIG.VAPID_PUBLIC;
	}

	@Post('/subscription')
	async subscribe(@Body() subscription: PushSubscription) {
		return this.notificationService.registerNotification(subscription);
	}
}
