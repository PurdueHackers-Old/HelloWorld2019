import * as bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';
import { IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MemberDto {
	@IsNotEmpty({ message: 'Please provide your first and last name' })
	@Matches(/([a-zA-Z']+ )+[a-zA-Z']+$/, { message: 'Please provide your first and last name' })
	@Expose()
	name: string;
	@IsNotEmpty({ message: 'Please provide a valid email address' })
	@IsEmail({}, { message: 'Please provide a valid email address' })
	@Expose()
	email: string;
	@Exclude()
	password: string;
	rememberToken?: string;
	resetPasswordToken?: string;
	comparePassword(password: string) {
		return password && bcrypt.compareSync(password, this.password);
	}
}

export interface IMemberModel extends MemberDto, Document {
	roles: string[];
	verified: boolean;
	checkedin: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			select: false,
			default: ''
		},
		roles: [String],
		verified: { type: Boolean, default: false },
		checkedin: { type: Boolean, default: false },
		rememberToken: { type: String },
		resetPasswordToken: { type: String }
	},
	{ timestamps: true }
);

schema.pre('save', async function(next) {
	const member = this as IMemberModel;
	if (member.isModified('password') || member.isNew) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(member.password, salt);
			member.password = hash;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	next();
});

schema.methods.comparePassword = function(password: string) {
	const member = this as IMemberModel;
	return password && bcrypt.compareSync(password, member.password);
};

export const Member = model<IMemberModel>('Member', schema, 'members');
