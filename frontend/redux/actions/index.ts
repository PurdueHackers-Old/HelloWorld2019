import ReactGA from 'react-ga';
import { Dispatch } from 'redux';
import * as jwt from 'jsonwebtoken';
import {
	ICreateUser,
	ILoginUser,
	ILoginResponse,
	IContext,
	IApplication,
	IUser,
	IGlobals,
	IStatsResponse
} from '../../@types';
import { api } from '../../utils';
import { setCookie, removeCookie, getToken } from '../../utils/session';
import * as flash from '../../utils/flash';
import { Status } from '../../../shared/app.enums';
import { setToken, setUser, setGreenFlash, setRedFlash } from '../creators';
import { Role } from '../../../shared/user.enums';
import { ApplicationsStatus } from '../../../shared/globals.enums';

// Auth Actions
// TODO: Signing up should not log user in
export const signUp = (body: ICreateUser) => async (dispatch: Dispatch) => {
	try {
		const {
			data: { response }
		} = await api.post('/auth/signup', body);
		dispatch(setToken(response.token));
		dispatch(setUser(response.user));
		setCookie('token', response.token);
		const resp: ILoginResponse = response;
		return resp;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const signIn = (body: ILoginUser) => async (dispatch: Dispatch) => {
	try {
		const {
			data: { response }
		} = await api.post('/auth/login', body);
		dispatch(setToken(response.token));
		dispatch(setUser(response.user));
		const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
		setCookie('token', response.token, null, {
			expires: !body.rememberMe ? tomorrow : nextYear
		});
		ReactGA.set({ userId: response.user._id });
		const resp: ILoginResponse = response;
		return resp;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const signOut = (ctx?: IContext) => async (dispatch: Dispatch) => {
	try {
		dispatch(setToken(''));
		dispatch(setUser(null));
		removeCookie('token', ctx);
		ReactGA.set({ userId: null });
	} catch (error) {
		throw error;
	}
};

export const forgotPassword = async (email: string) => {
	try {
		const {
			data: { response }
		} = await api.post('/auth/forgot', { email });
		return response;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const resetPassword = async (password: string, passwordConfirm: string, token: string) => {
	try {
		const {
			data: { response }
		} = await api.post('/auth/reset', {
			password,
			passwordConfirm,
			token
		});
		return response;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

// Should only be called in the "server-side" context in _app.tsx
// Takes token from cookie and populates redux store w/ token and user object
export const refreshSession = (ctx?: IContext) => async (dispatch: Dispatch) => {
	try {
		if (ctx && ctx.res && ctx.res.headersSent) return;
		const token = getToken(ctx);
		if (!token) {
			dispatch(setUser(null));
			dispatch(setToken(''));
			removeCookie('token', ctx);
			ReactGA.set({ userId: null });
			return null;
		}
		const {
			data: { response }
		} = await api.get('/auth/refresh', {
			headers: { Authorization: `Bearer ${token}` }
		});

		dispatch(setUser(response.user));
		dispatch(setToken(response.token));
		setCookie('token', response.token, ctx);
		ReactGA.set({ userId: response.user._id });
		return response;
	} catch (error) {
		// if (!error.response) throw error;
		dispatch(setUser(null));
		dispatch(setToken(''));
		removeCookie('token', ctx);
		ReactGA.set({ userId: null });
		return null;
	}
};

// User Actions
export const getUserApplication = async (id: string, ctx?: IContext) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/users/${id}/application`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const app: IApplication = response;
		return app;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const getOwnApplication = async (ctx?: IContext) => {
	try {
		const token = getToken(ctx);
		const id = (jwt.decode(token) as any)._id;
		return getUserApplication(id, ctx);
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const sendApplication = async (body: IApplication, ctx?: IContext, id?: string) => {
	try {
		const token = getToken(ctx);
		if (!id) id = (jwt.decode(token) as any)._id;
		const {
			data: { response }
		} = await api.post(`/users/${id}/apply`, body, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const app: IApplication = response;
		return app;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

// Application Actions
export const getApplications = async (ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/applications`, {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		return response;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const getApplication = async (id: string, ctx?: IContext) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/applications/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const app: IApplication = response;
		return app;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const updateApplicationStatus = async (id: string, status: Status, ctx?: IContext) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.post(
			`/applications/${id}/status`,
			{ status },
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		const app: IApplication = response;
		return app;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const getStats = async (ctx?: IContext) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/applications/stats`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const stats: IStatsResponse = response;
		return stats;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

// Exec Actions
export const getCheckin = async (ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/exec/checkin`, {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		const users: IUser[] = response;
		return users;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const checkinUser = async (email: string, ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.post(
			`/exec/checkin/${email}`,
			{},
			{
				params,
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		const user: IUser = response;
		return user;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

// Admin Actions
export const getUsers = async (ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/admin/users`, {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		const users: IUser[] = response;
		return users;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const updateRole = async (email: string, role: Role, ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.post(
			`/admin/role/`,
			{ email, role },
			{
				params,
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		const user: IUser = response;
		return user;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const sendMassEmails = async (ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.post(
			`/admin/emails/`,
			{},
			{
				params,
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return response;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

// Globals Actions
export const fetchGlobals = async (ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/globals/`, {
			params,
			headers: { Authorization: `Bearer ${token}` }
		});
		const globals: IGlobals = response;
		return globals;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const updateApplicationsStatus = async (
	status: ApplicationsStatus,
	ctx?: IContext,
	params?
) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.post(
			`/globals/status/`,
			{ status },
			{
				params,
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return response;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

export const makePublicApplications = async (status: boolean, ctx?: IContext, params?) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.post(
			`/globals/public/`,
			{ status },
			{
				params,
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return response;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};

// Flash Actions
export const sendErrorMessage = (msg: string, ctx?: IContext) => (dispatch: Dispatch) => {
	dispatch(setRedFlash(msg));
	flash.set({ red: msg }, ctx);
};

export const sendSuccessMessage = (msg: string, ctx?: IContext) => (dispatch: Dispatch) => {
	dispatch(setGreenFlash(msg));
	flash.set({ green: msg }, ctx);
};

export const clearFlashMessages = (ctx?: IContext) => (dispatch: Dispatch) => {
	dispatch(setGreenFlash(''));
	dispatch(setRedFlash(''));
	removeCookie('flash', ctx);
};

export const storageChanged = e => (dispatch, getState) => {
	const token = getToken(getState());
	if (!token) signOut()(dispatch);
	else dispatch(setToken(token));
};
