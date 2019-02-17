import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { signIn, sendErrorMessage, sendSuccessMessage } from '../../redux/actions';
import { LoginForm } from './LoginForm';
import { ILoginUser, ILoginResponse, IContext } from '../../@types';
import { err } from '../../utils';

type Props = {
	signin: (body: ILoginUser) => Promise<ILoginResponse>;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
};

@((connect as any)(null, {
	signin: signIn,
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage
}))
export class LoginPage extends Component<Props> {
	state = {
		email: '',
		password: ''
	};

	onChange = (e: ChangeEvent<HTMLInputElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const { user } = await this.props.signin(this.state);
			Router.push('/');
			this.props.flashSuccess(`Welcome ${user.name}!`);
		} catch (error) {
			this.props.flashError(err(error));
		}
	};

	render() {
		return (
			<div>
				Login Page
				<br />
				<LoginForm onSubmit={this.onSubmit} onChange={this.onChange} {...this.state} />
			</div>
		);
	}
}
