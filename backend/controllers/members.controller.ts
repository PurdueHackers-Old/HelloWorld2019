import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { Member, MemberDto, IMemberModel } from '../models/member';
import { memberMatches, multer } from '../utils';
import {
	JsonController,
	Get,
	QueryParam,
	Param,
	BadRequestError,
	Put,
	Body,
	Req,
	UseBefore,
	CurrentUser,
	UnauthorizedError,
	UseAfter
} from 'routing-controllers';
import { BaseController } from './base.controller';
import { ValidationMiddleware } from '../middleware/validation';

@JsonController('/api/members')
@UseAfter(ValidationMiddleware)
export class MemberController extends BaseController {
	@Get('/')
	async getAll(@QueryParam('sortBy') sortBy?: string, @QueryParam('order') order?: number) {
		order = order === 1 ? 1 : -1;
		sortBy = sortBy || 'createdAt';

		let contains = false;
		Member.schema.eachPath(path => {
			if (path.toLowerCase() === sortBy.toLowerCase()) contains = true;
		});
		if (!contains) sortBy = 'createdAt';

		const results = await Member.find({}, '_id name email createdAt')

			.sort({ [sortBy]: order })
			// .limit(100)
			.lean()
			.exec();

		return { members: results };
	}

	@Get('/:id')
	async getById(@Param('id') id: string) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid member ID');
		const member = await Member.findById(id)
			.lean()
			.exec();
		if (!member) throw new BadRequestError('Member does not exist');
		return member;
	}

	@Put('/:id')
	@UseBefore(multer.any())
	async updateById(
		@Req() req: Request,
		@Param('id') id: string,
		@Body() memberDto: MemberDto,
		@CurrentUser({ required: true }) user: IMemberModel
	) {
		if (!ObjectId.isValid(id)) throw new BadRequestError('Invalid member ID');
		if (!memberMatches(user, id))
			throw new UnauthorizedError('You are unauthorized to edit this profile');
		let member = await Member.findById(id, '+password').exec();
		if (!member) throw new BadRequestError('Member not found');

		member = await Member.findByIdAndUpdate(id, memberDto, { new: true })
			.lean()
			.exec();
		return member;
	}
}
