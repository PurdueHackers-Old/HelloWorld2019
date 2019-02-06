import cookie from 'js-cookie';
import Router from 'next/router';
import { Request } from 'express';
import { IUser, IContext } from '../@types';

export enum Role {
	USER = 'USER',
	MENTOR = 'MENTOR',
	EXEC = 'EXEC',
	ADMIN = 'ADMIN'
}

export const setCookie = (key: string, value: string | object) => {
	if (process.browser) cookie.set(key, value);
};

export const removeCookie = (key: string) => {
	if (process.browser) cookie.remove(key);
};

export const getCookie = (key: string, req?: Request) => {
	return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: string) => {
	return cookie.get(key);
};

const getCookieFromServer = (key: string, req: Request) => {
	if (!req || !req.cookies) return '';
	return req.cookies[key];
};

export const getToken = (ctx: { [x: string]: any } = {}) => {
	return getCookie('token', ctx.req);
};

export const redirect = (target: string, ctx: { [x: string]: any } = {}, replace?: boolean) => {
	if (ctx && ctx.res) {
		// Server redirect
		ctx.res.writeHead(replace ? 303 : 301, { Location: target });
		ctx.res.end();
	} else {
		// Browser redirect
		replace ? Router.replace(target) : Router.push(target);
	}
	return true;
};

const extractUser = (ctx: IContext) => {
	if (!ctx || !ctx.store) return null;
	return ctx.store.getState().sessionState.user;
};

export const hasPermission = (user: IUser, name: string): boolean => {
	if (!user || !user.role) return false;
	return user.role === Role.ADMIN || user.role === name;
};

export const isAuthenticated = (ctx: IContext, roles?: Role[]) => {
	if (!roles || !roles.length) return !!getToken(ctx);
	const user = extractUser(ctx);
	if (!user) return false;
	if (!roles.length) return true;
	if (!roles.some(role => hasPermission(user, role))) return false;
	return true;
};

export const redirectIfAuthenticated = (path: string, ctx: IContext) => {
	if (isAuthenticated(ctx)) return redirect(path, ctx, true);
	return false;
};

export const redirectIfNotAuthenticated = (
	path: string,
	ctx: IContext,
	roles?: Role[]
): boolean => {
	if (!isAuthenticated(ctx, roles)) return redirect(path, ctx, true);
	return false;
};
