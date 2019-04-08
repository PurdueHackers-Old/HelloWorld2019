import { ObjectId } from 'mongodb';
import {
	JsonController,
	Get,
	QueryParam,
	BadRequestError,
	Authorized,
	Params,
	Post,
	Body,
	Param
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { Announcement, AnnouncementDto } from '../models/announcement';
import { Type } from '../../shared/announcement.enums';
import { Role } from '../../shared/user.enums';

// TODO: Add tests
@JsonController('/api/announcements')
export class AnnouncementController extends BaseController {
	@Get('/')
	async getAll(
	) {
		const resultsQuery = Announcement.find({

		})

		const results = await resultsQuery.exec();
		return results;
	}

	@Post('/')
	@Authorized([Role.EXEC])
	async updateStatus(@Body() status: AnnouncementDto) {
		const application = await Announcement.create(status);
		return application;
	}
}
