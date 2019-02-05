import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import * as Multer from 'multer';
import { ExtractJwt } from 'passport-jwt';
import { IUserModel, User, Role } from '../models/user';

export const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
	}
});

export const successRes = (res: Response, response: any) => res.json({ status: 200, response });

export const errorRes = (res: Response, status: number, error: any) =>
	res.status(status).json({
		status,
		error
	});

// export const hasPermission = (user: IUserModel, name: string): boolean =>
// 	user && user.roles && user.roles.some(role => role === name || role === 'admin');

export const hasPermission = (user: IUserModel, name: string): boolean => {
	if (!user || !user.role) return false;
	return user.role === Role.ADMIN || user.role === name;
};

export const isAdmin = (user: IUserModel) => hasPermission(user, Role.ADMIN);

export const userMatches = (user: IUserModel, id: ObjectId | string, exec?: boolean) => {
	if (!user) return false;
	if (isAdmin(user)) return true;
	if (exec && hasPermission(user, Role.EXEC)) return true;
	return new ObjectId(user._id).equals(id);
	// return user._id === id ||
	// 	(typeof user._id.equals === 'function' && user._id.equals(id));
};

export const escapeRegEx = (str: string) =>
	str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

const dateToString = date =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		weekday: 'short'
	});

export const formatDate = date => {
	if (!date) return 'Current';
	const str = dateToString(date);
	return str !== 'Invalid Date' ? str : 'Current';
};

export const toBoolean = (val: any, obj: any, type) => `${val}`.toLowerCase() === 'true';

export const isNotEmpty = (obj: any, val: any) => val !== '' && val !== null && val !== undefined;

export const extractToken = (req: Request) =>
	ExtractJwt.fromExtractors([
		ExtractJwt.fromAuthHeaderAsBearerToken(),
		ExtractJwt.fromBodyField('token'),
		ExtractJwt.fromHeader('token'),
		ExtractJwt.fromUrlQueryParameter('token'),
		(r: Request) => {
			let token: string;
			if (r && r.cookies) token = r.cookies.token;
			return token;
		}
	])(req);
