import React, { Component, ChangeEvent, FormEvent } from 'react';
import {
	sendErrorMessage,
	getApplication,
	sendSuccessMessage,
	clearFlashMessages,
	sendApplication,
	updateApplicationStatus
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
import { ApplicationForm } from '../apply/ApplicationForm';
import { connect } from 'react-redux';
import { Status } from '../../../shared/app.enums';

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
			return { application, user };
		} catch (error) {
			redirect('/applications', ctx, true);
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
		}
	};

	state = {
		...this.props.application,
		status: this.props.application.statusInternal
	};

	onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onStatusSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { _id, status } = this.state;
		const { flashError, flashSuccess, clear } = this.props;
		try {
			clear();
			const app = await updateApplicationStatus(_id, status);
			this.setState({ ...app });
			return flashSuccess('Successfully updated application status!');
		} catch (error) {
			return flashError(err(error));
		}
	};

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { flashError, flashSuccess, clear, application } = this.props;
		try {
			clear();
			flashSuccess('Updating application...');
			await sendApplication(this.state, null, application.user._id);
			clear();
			return flashSuccess('Application successful!');
		} catch (error) {
			clear();
			return flashError(err(error));
		}
	};

	render() {
		const { application, user } = this.props;
		const disabled = !userMatches(user, application.user._id);
		return (
			<div>
				<h3>Application Page</h3>
				<br />
				<br />
				<form onSubmit={this.onStatusSubmit}>
					<label htmlFor="status">
						Status{' '}
						<select
							required
							name="status"
							onChange={this.onSelect}
							value={this.state.status}
						>
							{Object.values(Status).map(status => (
								<option value={status} key={status}>
									{status}
								</option>
							))}
						</select>
					</label>{' '}
					<input type="submit" value="Update Status" />
				</form>
				<br />
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
