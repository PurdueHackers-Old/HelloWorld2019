import { JsonController, Get, QueryParam, Post, Body, Param } from 'routing-controllers';
import { BaseController } from './base.controller';
import { Announcement, AnnouncementDto } from '../models/announcement';

interface QueryCondition {
	released: boolean;
	type?: string;
}

// TODO: Add tests
@JsonController('/api/announcements')
export class AnnouncementController extends BaseController {
	@Get('/')
	async getAll(@QueryParam('type') type?: string) {
		const conditions: QueryCondition = {
			released: true
		};
		if (type) {
			conditions.type = type;
		}
		const resultsQuery = Announcement.find(conditions);
		const results = await resultsQuery.exec();
		return results;
	}

	@Post('/')
	async updateStatus(@Body() status: AnnouncementDto) {
		const application = await Announcement.create(status);
		return application;
	}

	@Get('/:id')
	async getAnnouncement(@Param('id') id: string) {
		return Announcement.findById(id);
	}

	@Post('/:id/release')
	async releaseAnnouncement(@Param('id') id: string) {
		return Announcement.findById(id).update({
			released: true
		});
	}
}
