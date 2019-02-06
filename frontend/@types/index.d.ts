import { NextContext } from 'next';
import { Store } from 'redux';
import { IFlashState } from '../redux/reducers/flash';
import { ISessionState } from '../redux/reducers/session';


export interface IStoreState {
	flashState: IFlashState;
	sessionState: ISessionState;
}

export interface IContext extends NextContext {
	store: Store<IStoreState>
}

export interface IUser {
	_id: string;
	role: string;
	verified: boolean;
	checkedin: boolean;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

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
