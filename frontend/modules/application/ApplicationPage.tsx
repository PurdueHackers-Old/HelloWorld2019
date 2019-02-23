import React, { Component, ChangeEvent, FormEvent } from 'react';
import {
	sendErrorMessage,
	getApplication,
	sendSuccessMessage,
	clearFlashMessages,
	sendApplication
} from '../../redux/actions';
import { IContext, IApplication, IUser } from '../../@types';
import {
	redirectIfNotAuthenticated,
	redirect,
	userMatches,
	extractUser
} from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';
import ApplicationForm from '../apply/ApplicationForm';
import { connect } from 'react-redux';

type Props = {
	application: IApplication;
	user: IUser;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

@((connect as any)(null, {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
export class ApplicationPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			const application = await getApplication(ctx.query.id as string, ctx);
			const user = extractUser(ctx);
			return { application, user, id: ctx.query.id };
		} catch (error) {
			redirect('/applications', ctx, true);
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
		}
	};

	state = {
		...this.props.application
	};

	onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { flashError, flashSuccess, clear, application } = this.props;
		try {
			clear();
			await sendApplication(this.state, null, (application.user as IUser)._id);
			return flashSuccess('Application successful!');
		} catch (error) {
			return flashError(err(error));
		}
	};

	render() {
		const { application, user } = this.props;
		const disabled = !userMatches(user, (application.user as IUser)._id);
		return (
			<div>
				Application Page
				<br />
				<ApplicationForm
					{...this.state}
					disabled={disabled}
					onChange={this.onChange}
					onSelect={this.onSelect}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}
