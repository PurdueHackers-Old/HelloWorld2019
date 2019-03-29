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
	id: string;
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
			const id = ctx.query.id as string;
			const user = extractUser(ctx);
			return { user, id };
		} catch (error) {
			redirect('/applications', ctx, true);
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount = async () => {
		const { id } = this.props;
		const application: IApplication = await getApplication(id, null);
		this.setState({
			loading: false,
			...application,
			status: application.statusInternal
		})
	}
	// state = {
	// 	...this.props.application,
	// 	status: this.props.application.statusInternal
	// };

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
		const { flashError, flashSuccess, clear } = this.props;
		try {
			clear();
			flashSuccess('Updating application...');
			await sendApplication(this.state, null, this.state.user._id);
			clear();
			return flashSuccess('Application successful!');
		} catch (error) {
			clear();
			return flashError(err(error));
		}
	};

	render() {
		const { loading } = this.state;
		if (loading) return <span>...Loading</span>

		const { user } = this.props;
		const disabled = !userMatches(user, this.state.user._id);
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
