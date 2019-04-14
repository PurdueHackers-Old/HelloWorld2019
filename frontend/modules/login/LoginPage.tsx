import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
	signIn,
	sendErrorMessage,
	sendSuccessMessage,
	clearFlashMessages
} from '../../redux/actions';
import { LoginForm } from './LoginForm';
import { ILoginUser, ILoginResponse, IContext } from '../../@types';
import { err } from '../../utils';
import Link from 'next/link';

type Props = {
	signin: (body: ILoginUser) => Promise<ILoginResponse>;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

@((connect as any)(null, {
	signin: signIn,
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
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
			this.props.clear();
			this.props.flashSuccess('Signing in...');
			const { user } = await this.props.signin(this.state);
			Router.push('/');
			this.props.clear();
			this.props.flashSuccess(`Welcome ${user.name}!`);
		} catch (error) {
			this.props.clear();
			this.props.flashError(err(error));
		}
	};

	render() {
		return (
			<div>
				<h3>Login Page</h3>
				<br />
				<LoginForm onSubmit={this.onSubmit} onChange={this.onChange} {...this.state} />
				<br />
				Forgot your password?{' '}
				<Link href="/forgot">
					<a>Click Here</a>
				</Link>
			</div>
		);
	}
}
