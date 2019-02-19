import React, { Component } from 'react';
import { sendErrorMessage, getApplications } from '../../redux/actions';
import { IContext } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';

type Props = {};

export class ApplicationsPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			const applications = await getApplications(ctx);
			return applications;
		} catch (error) {
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
			return {};
		}
	};

	state = {};

	render() {
		console.log('Apps:', this.props);
		return <div>Applications Page</div>;
	}
}
