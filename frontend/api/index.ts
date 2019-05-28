import * as jwt from 'jsonwebtoken';
import { api } from '../utils';
import { getToken } from '../utils/session';
import { IContext, IGlobals, IUser, IApplication, IStatsResponse, IAnnouncement } from '../@types';
import { ApplicationsStatus } from '../../shared/globals.enums';
import { Role } from '../../shared/user.enums';
import { Status } from '../../shared/app.enums';

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

export const getAllAnnouncements = async (ctx?: IContext) => {
	try {
		const token = getToken(ctx);
		const {
			data: { response }
		} = await api.get(`/announcements`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const announcements: IAnnouncement[] = response;
		return announcements;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
};
