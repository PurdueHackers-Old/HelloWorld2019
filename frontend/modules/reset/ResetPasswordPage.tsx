import React, { Component, ChangeEvent, FormEvent } from 'react';
import { IContext } from '../../@types';
import { connect } from 'react-redux';
import {
	sendErrorMessage,
	sendSuccessMessage,
	clearFlashMessages,
	resetPassword
} from '../../redux/actions';
import { err } from '../../utils';
import Router, { withRouter, WithRouterProps } from 'next/router';
import { ResetPasswordForm } from './ResetPasswordForm';

type Props = {
	token: string;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
} & WithRouterProps;

@((connect as any)(null, {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
@(withRouter as any)
export class ResetPasswordPage extends Component<Props> {
	state = { password: '', passwordConfirm: '' };

	onChange = (e: ChangeEvent<HTMLInputElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { password, passwordConfirm } = this.state;
		const { flashSuccess, flashError, clear } = this.props;
		try {
			clear();
			const token = this.props.router.query.token as string;
			flashSuccess('Resetting password...');
			const response = await resetPassword(password, passwordConfirm, token);
			Router.push('/login');
			clear();
			return flashSuccess(response);
		} catch (error) {
			this.props.clear();
			console.error('EditProfile Page error:', error);
			return flashError(err(error));
		}
	};

	render() {
		return (
			<div>
				<h3>Reset Your Password</h3>
				<ResetPasswordForm
					{...this.state}
					onChange={this.onChange}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}
