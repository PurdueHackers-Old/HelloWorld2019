import React, { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { redirectIfNotAuthenticated } from '../../utils/session';
import {
	fetchGlobals,
	sendErrorMessage,
	updateApplicationsStatus,
	sendSuccessMessage,
	clearFlashMessages,
	updatePublicApplications
} from '../../redux/actions';
import { IContext } from '../../@types';
import { Role } from '../../../shared/user.enums';
import { ApplicationsStatus } from '../../../shared/globals.enums';
import { err } from '../../utils';
import { connect } from 'react-redux';

type Props = {
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

const Admin = ({ flashError, flashSuccess, clear }: Props) => {
	const [status, setStatus] = useState(null);
	const [pub, setPub] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const globals = await fetchGlobals(null);
				console.log('Globals: ', globals);
				setStatus(globals.applicationsStatus);
				setPub(`${globals.applicationsPublic}`);
			} catch (error) {
				clear();
				flashError('Couldnt load globals');
				setStatus(ApplicationsStatus.CLOSED);
				setPub(`false`);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	const onUpdateStatus = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			await updateApplicationsStatus(status);
			flashSuccess('Successfully updated applications status');
		} catch (error) {
			flashError(err(error));
		}
	};

	const onUpdatePublic = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			flashSuccess('Updating application public status');
			await updatePublicApplications(pub === 'true');
			clear();
			flashSuccess('Successfully updated applications public status');
		} catch (error) {
			clear();
			flashError(err(error));
		}
	};

	if (loading) return <span>Loading...</span>;
	return (
		<div>
			<h3>Admin Dashboard</h3>
			<Link href="/admin/roles">
				<a>Manage User Roles</a>
			</Link>
			<br />
			<h3>Applications Status</h3>
			<form onSubmit={onUpdateStatus}>
				<select onChange={e => setStatus(e.target.value as any)} value={status}>
					{Object.values(ApplicationsStatus).map(stat => (
						<option value={stat} key={stat}>
							{stat}
						</option>
					))}
				</select>
				<input type="submit" value="Submit" />
			</form>
			<br />
			<form onSubmit={onUpdatePublic}>
				<h3>Applications Public</h3>
				<select onChange={e => setPub(e.target.value)} value={pub}>
					<option value={'true'}>True</option>
					<option value={'false'}>False</option>
				</select>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

Admin.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.ADMIN] })) return {};
};

export const AdminPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Admin);
