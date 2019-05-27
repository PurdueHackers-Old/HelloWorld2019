import { setVapidDetails, sendNotification, PushSubscription } from 'web-push';
import {publicRuntimeConfig, serverRuntimeConfig} from '../config/env-config';
import { IUserModel, UserDto } from '../models/user';
import { Service } from 'typedi';

setVapidDetails(
	'https://purduehackers.com',
	publicRuntimeConfig.VAPID_PUBLIC,
	serverRuntimeConfig.VAPID_PRIVATE
)

@Service('notificationService')
export class NotificationService {
	registerNotification(subscription: PushSubscription, user?: IUserModel) {
		// TODO: only send welcome notification when it's a new subscription (no exisitng subscription in the db)
		return sendNotification(subscription, 'Successfully Subscribed!')
	}
	sendNotification(content: string) {
		// TODO: Send notification to all subscribers.
	}
	
	sendNotificationToUser(user: IUserModel, content: string) {
	}
}
