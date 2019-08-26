import React, { FormEvent, ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {
	signUp,
	sendErrorMessage,
	sendSuccessMessage,
	clearFlashMessages
} from '../../redux/actions';
import { ILoginResponse, ICreateUser, IContext } from '../../@types';
import { SignupForm } from './SignupForm';
import { err } from '../../utils';

interface Props {
	signup: (body: ICreateUser) => Promise<ILoginResponse>;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

const Signup = ({ signup, flashError, flashSuccess, clear }: Props) => {
	const [state, setState] = useState({ name: '', email: '', password: '', passwordConfirm: '' });

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setState({ ...state, [e.target.name]: e.target.value });

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			flashSuccess('Signing up...');
			const { user } = await signup(state);
			Router.push('/');
			clear();
			flashSuccess(`Welcome ${user.name}!`);
		} catch (error) {
			clear();
			flashError(err(error));
		}
	};

	return (
		<div
			className="uk-section section-primary uk-section-primary uk-flex uk-flex-center bg-purple-gradient fullscreen"
			style={{ paddingBottom: 0 }}
		>
			<div className="uk-container-small fullwidth uk-margin-large-bottom">
				<h2 className="h1-light text-yellow">Signup</h2>
				<br />
				<SignupForm onSubmit={onSubmit} onChange={onChange} {...state} />
				<br />
				Already have an account?{' '}
				<Link href="/login">
					<a>Click Here</a>
				</Link>
			</div>
		</div>
	);
};

export const SignupPage = connect(
	null,
	{
		signup: signUp,
		flashError: sendErrorMessage,
		flashSuccess: sendSuccessMessage,
		clear: clearFlashMessages
	}
)(Signup);
