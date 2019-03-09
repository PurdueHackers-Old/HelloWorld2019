import * as sendGrid from '@sendgrid/mail';
import CONFIG from '../config';
import { IUserModel, UserDto } from '../models/user';
import { Service } from 'typedi';

sendGrid.setApiKey(CONFIG.SENDGRID_KEY);

@Service('emailService')
export class EmailService {
	async sendResetEmail(user: IUserModel) {
		const url =
			CONFIG.NODE_ENV !== 'production'
				? 'http://localhost:5000'
				: 'https://purduehackers.com';

		return sendGrid.send({
			templateId: 'd-f534db9ac5df4fa5a0dc273095582e9d',
			from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
			to: user.email,
			dynamicTemplateData: {
				name: user.name,
				url,
				token: user.resetPasswordToken
			}
		} as any);
	}

	async sendAccountCreatedEmail(user: IUserModel) {
		const url =
			CONFIG.NODE_ENV !== 'production'
				? 'http://localhost:5000'
				: 'https://purduehackers.com';

		return await sendGrid.send({
			templateId: 'd-0bba1a0346c24bd69a46d81d2e950e55',
			from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
			to: user.email,
			dynamicTemplateData: {
				name: user.name,
				url,
				token: user.resetPasswordToken
			}
		} as any);
	}

	async sendErrorEmail(error: Error, user?: UserDto) {
		return sendGrid.send({
			templateId: 'd-9fbbdf1f9c90423a80d69b83885eefa8',
			from: `${CONFIG.ORG_NAME} <${CONFIG.EMAIL}>`,
			to: 'purduehackers@gmail.com',
			dynamicTemplateData: {
				timestamp: new Date(Date.now()).toLocaleString(),
				message: error.message.replace(/\n/g, '<br>'),
				stack: error.stack.replace(/\n/g, '<br>&emsp;'),
				user
			}
		} as any);
	}
}
