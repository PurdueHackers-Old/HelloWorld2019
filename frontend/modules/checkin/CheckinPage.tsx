import React, { FormEvent, useState, useEffect } from 'react';
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
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

export const Checkin = ({ flashError, flashSuccess, clear }: Props) => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [email, setEmail] = useState('');

	useEffect(() => {
		getCheckin(null, { email })
			.then(val => setUsers(val))
			.catch(error => flashError(err(error)));
	}, [email]);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			const user = await checkinUser(email);
			setUsers(users.filter(u => u._id !== user._id));
			setEmail('');
			flashSuccess(`Successfully checked in: ${user.name}`);
		} catch (error) {
			flashError(err(error));
		}
	};

	return (
		<div>
			Checkin Page
			<br />
			<form onSubmit={onSubmit}>
				<input
					autoComplete="off"
					list="emails"
					name="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<datalist id="emails">
					{users.map(user => (
						<option key={user._id} id={user._id} value={user.email}>
							{user.email}
						</option>
					))}
				</datalist>
				<input type="submit" />
			</form>
		</div>
	);
};

Checkin.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
};

export const CheckinPage = connect(
	null,
	{
		flashError: sendErrorMessage,
		flashSuccess: sendSuccessMessage,
		clear: clearFlashMessages
	}
)(Checkin);
