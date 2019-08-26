import React, { FormEvent, ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { IContext } from '../../@types';
import { err } from '../../utils';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { forgotPassword } from '../../api';

interface Props {
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

const ForgotPassword = ({ flashError, flashSuccess, clear }: Props) => {
	const [email, setEmail] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
	return (
		<div className="uk-section section-primary uk-section-primary uk-flex uk-flex-center bg-purple-gradient fullscreen">
			<div className="uk-container-small fullwidth uk-margin-large-bottom">
				<h2 className="h1-light text-yellow">Forgot Password</h2>
				<br />
				<ForgotPasswordForm email={email} onChange={onChange} onSubmit={onSubmit} />
			</div>
		</div>
	);
};

export const ForgotPasswordPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(ForgotPassword);
