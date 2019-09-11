import { Service } from 'typedi';
import axios from 'axios';
import CONFIG from '../config';
import { createLogger } from '../utils/logger';
import { IAnnouncementModel } from '../models/announcement';
import { InternalServerError } from 'routing-controllers';

@Service('slackService')
export class SlackService {
	logger = createLogger(this);

	async postMessage(announcement: IAnnouncementModel) {
		let { data } = await axios.get('https://slack.com/api/chat.postMessage', {
			params: {
				token: CONFIG.SLACK_TOKEN,
				channel: CONFIG.SLACK_CHANNEL_ID,
				text: announcement.body
			}
		});
		if (!data.ok) {
			this.logger.fatal('Error sending slack message:', data);
			throw new InternalServerError(data.error);
		}

		({ data } = await axios.get('https://slack.com/api/chat.postMessage', {
			params: {
				token: CONFIG.SLACK_TOKEN,
				channel: 'CK688GXTL',
				text: announcement.body
			}
		}));
		if (!data.ok) {
			this.logger.fatal('Error sending slack message:', data);
			throw new InternalServerError(data.error);
		}
		announcement.slackTS = data.ts;
		await announcement.save();
		return announcement;
	}

	async removeMessage(announcement: IAnnouncementModel) {
		let { data } = await axios.get('https://slack.com/api/chat.delete', {
			params: {
				token: CONFIG.SLACK_TOKEN,
				channel: CONFIG.SLACK_CHANNEL_ID,
				ts: announcement.slackTS
			}
		});
		if (!data.ok && data.error !== 'message_not_found') {
			this.logger.fatal('Error deleting slack message:', data);
			throw new InternalServerError(data.error);
		}

		({ data } = await axios.get('https://slack.com/api/chat.delete', {
			params: {
				token: CONFIG.SLACK_TOKEN,
				channel: 'CK688GXTL',
				ts: announcement.slackTS
			}
		}));
		if (!data.ok && data.error !== 'message_not_found') {
			this.logger.fatal('Error deleting slack message:', data);
			throw new InternalServerError(data.error);
		}

		return announcement;
	}
}
