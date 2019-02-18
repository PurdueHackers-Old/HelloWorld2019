import React, { Component, ChangeEvent, FormEvent } from 'react';
import { IContext, IUser } from '../../@types';
import { Role } from '../../../shared/user.enums';
import { redirectIfNotAuthenticated } from '../../utils/session';
import {
	sendErrorMessage,
	getCheckin,
	checkinUser,
	sendSuccessMessage,
	clearFlashMessages
} from '../../redux/actions';
import { err } from '../../utils';
import { connect } from 'react-redux';

type Props = {
	users: IUser[];
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

@((connect as any)(null, {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
export class CheckinPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			const users = (await getCheckin(ctx)) || [];
			return { users };
		} catch (error) {
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
		}
	};

	state = {
		users: this.props.users,
		email: ''
	};

	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			this.props.clear();
			const user = await checkinUser(this.state.email);
			this.setState({
				users: this.props.users.filter(u => u._id !== user._id),
				email: ''
			});
			this.props.flashSuccess(`Successfully checked in: ${user.name}`);
		} catch (error) {
			this.props.flashError(err(error));
		}
	};

	render() {
		return (
			<div>
				Checkin Page
				<br />
				<form onSubmit={this.onSubmit}>
					<input
						autoComplete="off"
						list="emails"
						name="email"
						value={this.state.email}
						onChange={this.onChange}
					/>
					<datalist id="emails">
						{this.state.users.map(user => (
							<option key={user._id} id={user._id} value={user.email}>
								{user.email}
							</option>
						))}
					</datalist>
					<input type="submit" />
				</form>
			</div>
		);
	}
}
