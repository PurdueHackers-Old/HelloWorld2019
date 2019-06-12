import {
	JsonController,
	Get,
	QueryParam,
	Post,
	Body,
	Param,
	Authorized,
	Delete
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { Announcement, AnnouncementDto } from '../models/announcement';
import { NotificationService } from '../services/notification.service';
import { Role } from '../../shared/user.enums';

// TODO: Add tests
@JsonController('/api/announcements')
export class AnnouncementController extends BaseController {
	constructor(private notificationService?: NotificationService) {
		super();
	}

	@Get('/')
	async getAll(@QueryParam('type') type?: string, @QueryParam('released') released?: boolean) {
		const conditions: {
			released?: boolean;
			type?: string;
		} = {};
		if (released !== undefined && released !== null) conditions.released = released;
		if (type) conditions.type = type;

		const resultsQuery = Announcement.find(conditions);
		const results = await resultsQuery.exec();
		return results;
	}

	// TODO: Create cron job to dispatch sending of announcement notifications
	@Post('/')
	@Authorized([Role.EXEC])
	createAnnouncement(@Body() announcement: AnnouncementDto) {
		return Announcement.create(announcement);
	}

	@Post('/:id/release')
	@Authorized([Role.EXEC])
	async releaseAnnouncement(@Param('id') id: string) {
		const announcement = await Announcement.findByIdAndUpdate(id, { released: true }).exec();
		await this.notificationService.sendNotification(announcement.title);
		return announcement;
	}

	@Delete('/:id')
	@Authorized([Role.EXEC])
	async deleteAnnouncement(@Param('id') id: string) {
		const announcement = await Announcement.findByIdAndDelete(id).exec();
		return announcement;
	}
}
