import { setVapidDetails, sendNotification, PushSubscription } from 'web-push';
import {publicRuntimeConfig, serverRuntimeConfig} from '../config/env-config';
import { IUserModel } from '../models/user';
import { Service } from 'typedi';
import { Subscription } from '../models/subscription';

setVapidDetails(
	'https://purduehackers.com',
	publicRuntimeConfig.VAPID_PUBLIC,
	serverRuntimeConfig.VAPID_PRIVATE
)

@Service('notificationService')
export class NotificationService {
	async registerNotification(subscription: PushSubscription, user?: IUserModel) {
		const result = await Subscription.updateOne({
			content: subscription
		}, {
			user,
			content: subscription
		}, { upsert: true })
		if (result.upserted && result.upserted.length > 0) {
			await sendNotification(subscription, 'Successfully Subscribed!')
		}
	}
	async sendNotification(content: string, user?: IUserModel) {
		const subscriptions = await Subscription.find(user ? { user } : {})
		for (const subscription of subscriptions) {
			await sendNotification(subscription.content, content)
		}
	}
}
