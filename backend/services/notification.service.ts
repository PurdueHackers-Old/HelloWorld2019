import { setVapidDetails, sendNotification, PushSubscription } from 'web-push';
import CONFIG from '../config';
import { IUserModel } from '../models/user';
import { Service } from 'typedi';
import { Subscription } from '../models/subscription';

setVapidDetails('https://purduehackers.com', CONFIG.VAPID_PUBLIC, CONFIG.VAPID_PRIVATE);

@Service('notificationService')
export class NotificationService {
	async registerNotification(subscription: PushSubscription, user?: IUserModel) {
		const result = await Subscription.updateOne(
			{ endpoint: subscription.endpoint },
			{ user, ...subscription },
			{ upsert: true }
		);

		if (result.upserted && result.upserted.length > 0) {
			return await sendNotification(subscription, 'Successfully Subscribed!');
		}
	}
	async sendNotification(body: string, user?: IUserModel) {
		const subscriptions = await Subscription.find(user ? { user } : {});
		for (const subscription of subscriptions) {
			await sendNotification(subscription, body);
		}
	}
}
