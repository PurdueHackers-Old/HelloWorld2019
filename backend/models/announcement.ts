import { Document, Schema, model } from 'mongoose';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { IUserModel } from './user';
import { Type } from 'class-transformer';
import { Type as AnnouncementType } from '../../shared/announcement.enums';

export class AnnouncementDto {
	@Type(() => String)
	@IsNotEmpty({ message: 'A title is required' })
	title: string;

	@Type(() => String)
	@IsNotEmpty({ message: 'The content of the announcement is required' })
	content: string;

	@IsNotEmpty({ message: 'Please provide a type for the announcement' })
	@IsEnum(AnnouncementType, { message: 'Please provide a valid announcement type' })
	type: AnnouncementType;
}

export interface IAnnouncementModel extends AnnouncementDto, Document {
	user: IUserModel;
	createdAt: Date;
	released: boolean;
}

const schema = new Schema(
	{
		/*user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},*/
		title: String,
		content: String,
		type: {
			type: String,
			default: AnnouncementType.MISC,
			enum: Object.values(AnnouncementType),
			select: false
		},
		released: Boolean
	},
	{ timestamps: true }
);

export const Announcement = model<IAnnouncementModel>('Announcement', schema, 'announcements');
