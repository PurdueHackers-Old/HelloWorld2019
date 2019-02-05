import { Document, Schema, model } from 'mongoose';
import { IsNotEmpty, IsEnum, IsIn, IsNumber, ValidateIf, IsUrl, Length } from 'class-validator';
import { IUserModel } from './user';
import { Type } from 'class-transformer';
import {
	Gender,
	ethnicities,
	ClassYear,
	gradYears,
	Major,
	Referral,
	ShirtSize,
	Status
} from './app.enums';
import { isNotEmpty } from '../utils';

export class ApplicationDto {
	@IsNotEmpty()
	@IsEnum(Gender, { message: 'Please provide a valid gender' })
	gender: Gender;

	@IsNotEmpty()
	@IsEnum(ethnicities, { message: 'Please provide a valid ethnicity' })
	ethnicity: string;

	@IsNotEmpty()
	@IsEnum(ClassYear, { message: 'Please provide a valid class year' })
	classYear: ClassYear;

	@IsNotEmpty()
	@Type(() => Number)
	@IsNumber({}, { message: 'Please provide a valid graduation year' })
	@IsIn(gradYears, { message: 'Please provide a valid graduation year' })
	graduationYear: number;

	// TODO: Add major enum
	@IsNotEmpty()
	@IsEnum(Major, { message: 'Please provide a valid class major' })
	major: string;

	@IsNotEmpty()
	@IsEnum(Referral, { message: 'Please provide a valid class major' })
	referral: string;

	@Type(() => Number)
	@IsNumber({}, { message: 'Please provide a valid hackathon number' })
	hackathons: number;

	@IsNotEmpty()
	@IsEnum(ShirtSize, { message: 'Please provide a valid class year' })
	shirtSize: string;

	dietaryRestrictions: string;

	@ValidateIf(isNotEmpty)
	@IsUrl({}, { message: 'Please provide a valid website URL' })
	website: string;

	@IsNotEmpty()
	@Length(1, 250)
	answer1: string;

	@IsNotEmpty()
	@Length(1, 250)
	answer2: string;

	resume: string;
}

export interface IApplicationModel extends ApplicationDto, Document {
	user: IUserModel;
	// TODO: Add status enum
	statusInternal: Status;
	statusPublic: Status;
	createdAt: Date;
	updatedAt: Date;
}

const schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		gender: { type: String, required: true, enum: Object.values(Gender) },
		ethnicity: { type: String, required: true, enum: ethnicities },
		classYear: { type: String, required: true, enum: Object.values(ClassYear) },
		graduationYear: { type: Number, required: true },
		major: { type: String, required: true, enum: Object.values(Major) },
		referral: { type: String, required: true, enum: Object.values(Referral) },
		hackathons: { type: Number, default: 0 },
		shirtSize: { type: String, required: true, enum: Object.values(ShirtSize) },
		dietaryRestrictions: { type: String, default: '' },
		website: { type: String, default: '' },
		answer1: { type: String, required: true },
		answer2: { type: String, required: true },
		emailSent: { type: Boolean, default: false },
		statusInternal: { type: String, default: Status.PENDING, enum: Object.values(Status) },
		statusPublic: { type: String, default: Status.PENDING, enum: Object.values(Status) }
	},
	{ timestamps: true }
);

export const Application = model<IApplicationModel>('Application', schema, 'applications');
