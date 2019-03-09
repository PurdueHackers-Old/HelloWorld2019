import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
	sendErrorMessage,
	sendSuccessMessage,
	clearFlashMessages,
	forgotPassword
} from '../../redux/actions';
import { IContext } from '../../@types';
import { err } from '../../utils';
import { ForgotPasswordForm } from './ForgotPasswordForm';

type Props = {
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

@((connect as any)(null, {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
export class ForgotPasswordPage extends Component<Props> {
	state = { email: '' };

	onChange = (e: ChangeEvent<HTMLInputElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email } = this.state;
		const { flashSuccess, flashError, clear } = this.props;
		try {
			clear();
			flashSuccess('Please wait...');
			const response = await forgotPassword(email);
			return flashSuccess(response);
		} catch (error) {
			clear();
			return flashError(err(error));
		}
	};
	render() {
		return (
			<div>
				<h3>Forgot Password</h3>
				<br />
				<ForgotPasswordForm
					{...this.state}
					onChange={this.onChange}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}
