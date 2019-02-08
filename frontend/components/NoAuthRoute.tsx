import React, { Component } from 'react';
import { Role, isAuthenticated } from '../utils/session';
import { IContext } from '../@types';
import Redirect from './Redirect';

const NoAuthRoute = (Comp, msg: string) => {
	class Route extends Component<{ ctx: IContext }> {
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
			if (!isAuthenticated(ctx)) return <Comp {...this.props} />;
			return <Redirect to="/" msgRed={msg} />;
		}
	}
	return Route;
};

export default NoAuthRoute;
