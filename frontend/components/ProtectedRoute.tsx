import React, { Component } from 'react';
import { Role, isAuthenticated } from '../utils/session';
import { IContext } from '../@types';
import Redirect from './Redirect';

const ProtectedRoute = (Comp, msg: string, roles?: Role[]) => {
	class Route extends Component<{ ctx: IContext }> {
		static getInitialProps = ctx => {
			return {
				ctx: {
					req: {
						cookies: ctx.req ? ctx.req.cookies : {}
					}
				}
			};
		};

		render() {
			const { ctx } = this.props;
			if (isAuthenticated(ctx, roles)) return <Comp />;
			return <Redirect to="/" msgRed={msg} />;
		}
	}
	return Route;
};

export default ProtectedRoute;
