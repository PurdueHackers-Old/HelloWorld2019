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
import { Query } from 'mongoose';

// TODO: Add tests
@JsonController('/api/announcements')
export class AnnouncementController extends BaseController {
	@Get('/')
	async getAll(
		@QueryParam('type') type?: string
	) {
		const conditions = {
			released: true
		}
		if (type) {
			conditions.type = type
		}
		const resultsQuery = Announcement.find(conditions)
		const results = await resultsQuery.exec();
		return results;
	}

	@Post('/')
	//@Authorized([Role.EXEC])
	async updateStatus(@Body() status: AnnouncementDto) {
		const application = await Announcement.create(status);
		return application;
	}
	
	@Get('/:id')
	async getAnnouncement(@Param('id') id: string) {
		return Announcement.findById(id)
	}

	@Post('/:id/release')
	async releaseAnnouncement(@Param('id') id: string) {
		return Announcement.findById(id).update({
			released: true
		})
	}
}
