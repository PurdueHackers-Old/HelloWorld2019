import { Document, Schema, model } from 'mongoose';
import { ApplicationsStatus } from '../../shared/globals.enums';

export interface IGlobalsModel extends Document {
	applicationsStatus: ApplicationsStatus;
	applicationsPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const schema = new Schema(
	{
		applicationsStatus: {
			type: String,
			enum: Object.values(ApplicationsStatus),
			default: ApplicationsStatus.OPEN
		},
		applicationsPublic: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

export const Globals = model<IGlobalsModel>('Globals', schema, 'globals');
