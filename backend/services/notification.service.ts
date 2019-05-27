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
		console.log(subscription)
		return sendNotification(subscription, 'Successfully Subscribed!')
	}
	sendNotification(content: string) {
		
	}
	
	sendNotificationToUser(user: IUserModel, content: string) {
	}
}
