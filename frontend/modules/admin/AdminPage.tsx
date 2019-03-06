import React from 'react';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { IContext } from '../../@types';
import { Role } from '../../../shared/user.enums';
import Link from 'next/link';

export const AdminPage = () => {
	return (
		<div>
			<h3>Admin Dashboard</h3>
			<Link href="/admin/roles">
				<a>Change Roles</a>
			</Link>
		</div>
	);
};

AdminPage.getInitialProps = (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.ADMIN] })) return {};
};
