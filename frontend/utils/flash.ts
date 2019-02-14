import cookie from 'js-cookie';
import { IContext, flashType } from '../@types';
import { getCookie, removeCookie, setCookie } from './session';

export const set = (value: flashType, ctx?: IContext, options?: any) => {
	setCookie('flash', value, ctx, options);
};

export const get = (ctx?: IContext): flashType => {
	const value = getCookie('flash', ctx);
	removeCookie('flash', ctx);
	return value || {};
};
