import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
const { publicRuntimeConfig: CONFIG } = getConfig();

export const api = axios.create({
	baseURL: CONFIG.API_URL
});

export const err = e =>
	!e
		? 'Whoops, something went wrong!'
		: e.message && typeof e.message === 'string'
		? e.message
		: e.error && typeof e.error === 'string'
		? e.error
		: 'Whoops, something went wrong!';

export const redirect = (target: string, ctx: { [x: string]: any } = {}) => {
	if (ctx.res) {
		// server
		// 303: "See other"
		ctx.res.writeHead(303, { Location: target });
		ctx.res.end();
	} else {
		// In the browser, we just pretend like this never even happened
		Router.replace(target);
	}
};
