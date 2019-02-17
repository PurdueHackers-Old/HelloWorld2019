import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { signUp, sendErrorMessage, sendSuccessMessage } from '../../redux/actions';
import { ILoginResponse, ICreateUser, IContext } from '../../@types';
import { ISessionState } from '../../redux/reducers/session';
import { SignupForm } from './SignupForm';
import { err } from '../../utils';

type Props = {
	signup: (body: ICreateUser) => Promise<ILoginResponse>;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
} & ISessionState;

@((connect as any)(null, {
	signup: signUp,
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage
}))
export class SignupPage extends Component<Props> {
	state = {
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};

	onChange = (e: ChangeEvent<HTMLInputElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { name, email, password, passwordConfirm } = this.state;
		try {
			const { user } = await this.props.signup(this.state);
			Router.push('/');
			this.props.flashSuccess(`Welcome ${user.name}!`);
		} catch (error) {
			this.props.flashError(err(error));
		}
	};

	render() {
		return (
			<div>
				Signup Page
				<br />
				<SignupForm onSubmit={this.onSubmit} onChange={this.onChange} {...this.state} />
			</div>
		);
	}
}
