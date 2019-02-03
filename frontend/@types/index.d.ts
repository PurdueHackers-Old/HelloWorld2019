import { AnyAction } from 'redux';

export interface ICreateUser {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface ILoginUser {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface Action {
	
}
