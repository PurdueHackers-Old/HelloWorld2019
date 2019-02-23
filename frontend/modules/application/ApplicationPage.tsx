import React, { Component } from 'react';
import { sendErrorMessage, getApplications, getApplication } from '../../redux/actions';
import { IContext, IApplication } from '../../@types';
import { redirectIfNotAuthenticated, redirect } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';

type Props = {
	application: IApplication;
};

export class ApplicationPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			console.log('Context', ctx.query.id);
			const application = await getApplication(ctx.query.id as string, ctx);
			redirect('/applications', ctx, true);
			sendErrorMessage('Application not found', ctx)(ctx.store.dispatch);
			return application;
		} catch (error) {
			// sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
			// return { applications: [], pagination: { total: 0 } };
		}
	};

	state = {
	};

	render() {
		console.log('Application Props:', this.props);
		return (
			<div>
				Application Page
				
				<br />
			</div>
		);
	}
}
