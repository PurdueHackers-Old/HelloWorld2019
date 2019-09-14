import React, { FormEvent, useState, useEffect, useRef } from 'react';
import { IContext, IUser } from '../../@types';
import { Role } from '../../../shared/user.enums';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { err, endResponse } from '../../utils';
import { connect } from 'react-redux';
import Link from 'next/link';
import { getCheckin, checkinUser, getAllUsers } from '../../api';

interface Props {
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

const Checkin = ({ flashError, flashSuccess, clear }: Props) => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [checkedinUsers, setCheckedinUsers] = useState(0);
	const [email, setEmail] = useState('');

	useEffect(() => {
		getAllUsers(null, { filter: { checkedin: true } })
			.then(users => {
				console.log(users);
				setCheckedinUsers(users.length);
			})
			.catch(error => flashError(err(error)));
	}, []);

	useEffect(() => {
		getCheckin(null, { email })
			.then(val => setUsers(val))
			.catch(error => flashError(err(error)));
	}, [email]);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			flashSuccess('Checking in...');
			const user = await checkinUser(email);
			setUsers(users.filter(u => u._id !== user._id));
			setEmail('');
			setCheckedinUsers(checkedinUsers + 1);
			clear();
			flashSuccess(`Successfully checked in: ${user.name}`);
		} catch (error) {
			clear();
			flashError(err(error));
		}
	};

	return (
		<div
			className="uk-section uk-section-primary uk-flex uk-flex-center bg-purple-gradient"
			id="schedule"
			style={{ paddingBottom: 0, height: '100%' }}
		>
			<div className="uk-container-small fullwidth uk-margin-large-bottom">
				<h2 className="h1-light text-yellow">Checkin</h2>
				<br />
				<h4>Users Checked in: {checkedinUsers}</h4>
				<Link href="/checkin/scan">
					<a>Scan QR Code</a>
				</Link>
				<br />
				<br />
				<form onSubmit={onSubmit} className="uk-form-horizontal">
					<label>
						Email:{' '}
						<input
							autoComplete="off"
							className="uk-textarea"
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
					</label>
					<br />
					<input type="submit" className="uk-button-ancmnt" />
				</form>
			</div>
		</div>
	);
};

Checkin.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return endResponse(ctx);
};

export const CheckinPage = connect(
	null,
	{
		flashError: sendErrorMessage,
		flashSuccess: sendSuccessMessage,
		clear: clearFlashMessages
	}
)(Checkin);
