import React from 'react';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { IContext } from '../../@types';
import { Role } from '../../../shared/user.enums';

export const AdminPage = () => {
	return (
		<div>
			<h3>Admin Dashboard</h3>
		</div>
	);
};

AdminPage.getInitialProps = (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.ADMIN] })) return {};
};
