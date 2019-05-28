import { Document, Schema, model } from 'mongoose';
import { IUserModel } from './user';
import { IsNotEmpty } from 'class-validator';

export class SubscriptionDto {
	@IsNotEmpty({ message: 'Endpoint must be defined' })
	endpoint: string;

	@IsNotEmpty({ message: 'Keys must be defined' })
	keys: { auth: string; p256dh: string };
}

export interface ISubscriptionModel extends SubscriptionDto, Document {
	user: IUserModel;
}

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	endpoint: String,
	keys: {
		auth: String,
		p256dh: String
	}
});

export const Subscription = model<ISubscriptionModel>('Subscription', schema, 'subscriptions');
