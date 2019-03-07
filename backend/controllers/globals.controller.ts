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
		console.log('Globals:', globals);

		return globals;
	}

	// TODO: Add tests
	@Post('/status')
	@Authorized([Role.ADMIN])
	async updateStatus(@BodyParam('status') s: string) {
		const status: ApplicationsStatus = ApplicationsStatus[s];
		if (!status) throw new BadRequestError('Invalid status');
		const globals = await Globals.findOneAndUpdate(
			{},
			{ applicationsStatus: status },
			{ upsert: true, new: true }
		).exec();
		return globals;
		// const globals = await Globals.findOne().exec();
		// globals.applicationsStatus = status;
		// await globals.save();
		// return globals;
	}

	// TODO: Add tests
	@Post('/public')
	@Authorized([Role.ADMIN])
	async updatePublicStatus(@BodyParam('public') pub: boolean) {
		// const globals = await Globals.findOne().exec();
		// globals.applicationsPublic = pub;
		// await globals.save();
		// return globals;
		const globals = await Globals.findOneAndUpdate(
			{},
			{ applicationsPublic: pub },
			{ upsert: true, new: true }
		).exec();
		return globals;
	}
}
