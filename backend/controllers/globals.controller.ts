import {
	JsonController,
	Get,
	Authorized,
	Post,
	BodyParam,
	BadRequestError
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { Role } from '../../shared/user.enums';
import { ApplicationsStatus } from '../../shared/globals.enums';
import { Globals } from '../models/globals';

@JsonController('/api/globals')
export class GlobalsController extends BaseController {
	@Get('/')
	async getGlobals() {
		const globals = await Globals.findOneAndUpdate({}, {}, { upsert: true, new: true }).exec();
		return globals;
	}

	// TODO: Add tests
	@Post('/status')
	@Authorized([Role.ADMIN])
	async updateStatus(@BodyParam('status') s: string) {
		const status = Object.values(ApplicationsStatus).find(stat => stat === s);
		if (!status) throw new BadRequestError('Invalid status');
		const globals = await Globals.findOneAndUpdate(
			{},
			{ applicationsStatus: status },
			{ upsert: true, new: true }
		).exec();
		return globals;
	}

	// TODO: Add tests
	@Post('/public')
	@Authorized([Role.ADMIN])
	async updatePublicStatus(@BodyParam('status') status: boolean) {
		const globals = await Globals.findOneAndUpdate(
			{},
			{ applicationsPublic: status },
			{ upsert: true, new: true }
		).exec();
		return globals;
	}
}
