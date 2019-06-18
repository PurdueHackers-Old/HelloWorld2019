import { Service } from 'typedi';
import axios from 'axios';
import CONFIG from '../config';
import { createLogger } from '../utils/logger';
import { IAnnouncementModel } from '../models/announcement';

@Service('slackService')
export class SlackService {
	logger = createLogger(this);

	async postMessage(announcement: IAnnouncementModel) {
		const { data } = await axios.get('https://slack.com/api/chat.postMessage', {
			params: {
				token: CONFIG.SLACK_TOKEN,
				channel: CONFIG.SLACK_CHANNEL_ID,
				text: announcement.body
			}
		});
		announcement.slackTS = data.ts;
		await announcement.save();
		return announcement;
	}

	async removeMessage(announcement: IAnnouncementModel) {
		await axios.get('https://slack.com/api/chat.delete', {
			params: {
				token: CONFIG.SLACK_TOKEN,
				channel: CONFIG.SLACK_CHANNEL_ID,
				ts: announcement.slackTS
			}
		});
		announcement.slackTS = '';
		await announcement.save();
		return announcement;
	}
}
