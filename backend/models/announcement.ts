import { Document, Schema, model } from 'mongoose';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { AnnouncementLabel } from '../../shared/announcement.enums';
import { IsDate } from '../validators/date';

export class AnnouncementDto {
	@Type(() => String)
	@IsNotEmpty({ message: 'A title is required' })
	title: string;

	@Type(() => String)
	@IsNotEmpty({ message: 'The body of the announcement is required' })
	body: string;

	@IsNotEmpty({ message: 'Please provide a label for the announcement' })
	@IsEnum(AnnouncementLabel, { message: 'Please provide a valid announcement label', each: true })
	labels: AnnouncementLabel[];

	@IsNotEmpty({ message: 'Please provide a broadcast time for the announcement' })
	@IsDate({ message: 'Invalid broadcast time' })
	broadcastTime: Date;
}

export interface IAnnouncementModel extends AnnouncementDto, Document {
	createdAt: Date;
	released: boolean;
}

const schema = new Schema(
	{
		title: String,
		body: String,
		labels: [String],
		broadcastTime: Date,
		released: Boolean
	},
	{ timestamps: true }
);

export const Announcement = model<IAnnouncementModel>('Announcement', schema, 'announcements');
