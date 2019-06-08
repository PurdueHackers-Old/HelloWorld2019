import {
	JsonController,
	Get,
	QueryParam,
	Post,
	Body,
	Param,
	Authorized
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { Announcement, AnnouncementDto } from '../models/announcement';
import { NotificationService } from '../services/notification.service';
import { Role } from '../../shared/user.enums';

interface QueryCondition {
	released: boolean;
	type?: string;
}

// TODO: Add tests
@JsonController('/api/announcements')
export class AnnouncementController extends BaseController {
	constructor(private notificationService?: NotificationService) {
		super();
	}

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

	@Get('/drafts')
	@Authorized([Role.EXEC])
	async getAllDrafts(@QueryParam('type') type?: string) {
		const conditions: QueryCondition = {
			released: false
		};
		if (type) {
			conditions.type = type;
		}
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

	@Get('/:id')
	async getAnnouncement(@Param('id') id: string) {
		return Announcement.findById(id);
	}

	@Post('/:id/release')
	@Authorized([Role.EXEC])
	async releaseAnnouncement(@Param('id') id: string) {
		const announcement = await Announcement.findByIdAndUpdate(id, { released: true }).exec();
		this.notificationService.sendNotification(announcement.title);
		return announcement;
	}
}
