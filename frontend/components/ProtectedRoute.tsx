import React from 'react';
import { Role, isAuthenticated } from '../utils/session';
import { IContext } from '../@types';
import Redirect from './Redirect';

const ProtectedRoute = (Comp, msg: string, roles?: Role[]) => (ctx: IContext) => {
	if (isAuthenticated(ctx, roles)) return <Comp />;
	return <Redirect to="/" msgRed={msg} />;
};

export default ProtectedRoute;
