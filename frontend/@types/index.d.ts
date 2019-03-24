import { NextContext } from 'next';
import { Store } from 'redux';
import { IFlashState } from '../redux/reducers/flash';
import { ISessionState } from '../redux/reducers/session';
import { Request, Response } from 'express';
import { Role } from '../../shared/user.enums';
import { ClassYear, Gender, Major, Referral, ShirtSize, Status } from '../../shared/app.enums';
import { ApplicationsStatus } from '../../shared/globals.enums';

export interface IStoreState {
	flashState: IFlashState;
	sessionState: ISessionState;
}

export interface IContext extends NextContext {
	store: Store<IStoreState>;
	req: Request;
	res: Response;
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	role: Role;
	verified: boolean;
	checkedin: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface IApplication {
	_id: string;
	name: string;
	email: string;
	gender: Gender;
	ethnicity: string;
	classYear: ClassYear;
	graduationYear: number;
	major: Major;
	referral: Referral;
	hackathons: number;
	shirtSize: ShirtSize;
	dietaryRestrictions: string;
	website: string;
	answer1: string;
	answer2: string;
	resume: string;
	statusInternal: Status;
	statusPublic: Status;
	user: IUser;
}

export interface IGlobals {
	applicationsPublic: boolean;
	applicationsStatus: ApplicationsStatus;
}

export type flashColor = 'red' | 'green';
export type flashType = { [key in flashColor]?: string };

// Request types
export interface ICreateUser {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface ILoginUser {
	email: string;
	password: string;
}

// Response types
export interface ILoginResponse {
	token: string;
	user: IUser;
}

export interface IStatsResponse {
	total: number;
	pending: number;
	accepted: number;
	rejected: number;
	waitlist: number;
}
