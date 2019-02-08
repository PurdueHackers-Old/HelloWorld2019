import React, { Component } from 'react';
import { Role, isAuthenticated } from '../utils/session';
import { IContext } from '../@types';
import Redirect from './Redirect';

const ProtectedRoute = (Comp, msg: string, roles?: Role[]) => {
	class Route extends Component {
		static getInitialProps = ctx => {
			const pageProps = Comp.getInitialProps && Comp.getInitialProps(ctx);
			const newCtx = {
				store: ctx.store,
				req: {
					cookies: ctx.req ? ctx.req.cookies : {}
				}
			};
			return {
				ctx: newCtx,
				...pageProps
			};
		};
		render() {
			const { ctx } = this.props;
			// console.log('Protected context:', ctx);
			if (isAuthenticated(ctx, roles)) return <Comp {...this.props} />;
			return <Redirect to="/" msgRed={msg} />;
		}
	}
	return Route;
};

export default ProtectedRoute;
