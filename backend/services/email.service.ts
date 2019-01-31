import * as jwt from 'jsonwebtoken';
import * as sendGrid from '@sendgrid/mail';
import CONFIG from '../config';
import { IMemberModel, MemberDto } from '../models/member';
import { Service } from 'typedi';

sendGrid.setApiKey(CONFIG.SENDGRID_KEY);

@Service('emailService')
export class EmailService {
	async sendResetEmail(member: IMemberModel) {
		const token = jwt.sign({ id: member._id }, CONFIG.SECRET, {
			expiresIn: '2 days'
		});
		member.resetPasswordToken = token;
		await member.save();

		const url =
			CONFIG.NODE_ENV !== 'production'
				? 'http://localhost:3000'
				: 'https://purduehackers.com';

		return sendGrid.send({
			templateId: 'd-850d406dbbf240bc9f53f455ed975321',
			from: `"${CONFIG.ORG_NAME}" <${CONFIG.EMAIL}>`,
			to: member.email,
			dynamicTemplateData: {
				name: member.name,
				url,
				token
			}
		} as any);
	}

	async sendAccountCreatedEmail(member: IMemberModel) {
		const token = jwt.sign({ id: member._id }, CONFIG.SECRET, {
			expiresIn: '2 days'
		});
		member.resetPasswordToken = token;
		await member.save();

		const url =
			CONFIG.NODE_ENV !== 'production'
				? 'http://localhost:3000'
				: 'https://purduehackers.com';

		return await sendGrid.send({
			templateId: 'd-0bba1a0346c24bd69a46d81d2e950e55',
			from: `"${CONFIG.ORG_NAME}" <${CONFIG.EMAIL}>`,
			to: member.email,
			dynamicTemplateData: {
				name: member.name,
				url,
				token
			}
		} as any);
	}

	async sendErrorEmail(error: Error, user?: MemberDto) {
		// if (CONFIG.NODE_ENV !== 'production') return null;
		return sendGrid.send({
			templateId: 'd-9fbbdf1f9c90423a80d69b83885eefa8',
			from: `"${CONFIG.ORG_NAME}" <${CONFIG.EMAIL}>`,
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
