import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { redirectIfNotAuthenticated } from '../../utils/session';
import {
	fetchGlobals,
	sendErrorMessage,
	updateApplicationsStatus,
	sendSuccessMessage,
	clearFlashMessages,
	makePublicApplications,
	sendMassEmails
} from '../../redux/actions';
import { IContext } from '../../@types';
import { Role } from '../../../shared/user.enums';
import { ApplicationsStatus } from '../../../shared/globals.enums';
import { err, formatDate } from '../../utils';
import { connect } from 'react-redux';

type Props = {
	applicationsPublic: boolean;
	emailsSent: Date | null;
	applicationsStatus: ApplicationsStatus;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

const Admin = ({
	applicationsPublic,
	applicationsStatus,
	emailsSent,
	flashError,
	flashSuccess,
	clear
}: Props) => {
	const [status, setStatus] = useState(applicationsStatus);
	const [pub, setPub] = useState(`${applicationsPublic}`);

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
			await makePublicApplications(pub === 'true');
			flashSuccess('Successfully updated applications public status');
		} catch (error) {
			flashError(err(error));
		}
	};

	const onSendMassEmails = async () => {
		try {
			const shouldSendEmails = confirm('Are you sure you want to send mass emails?');
			if (!shouldSendEmails) return;
			flashSuccess('Mass emailing all applicants...');
			await sendMassEmails();
			flashSuccess('Successfully sent mass applications emails');
		} catch (error) {
			flashError(err(error));
		}
	};

	return (
		<div>
			<h2>Admin Dashboard</h2>
			<Link href="/admin/roles">
				<a>Manage User Roles</a>
			</Link>
			<br />
			<h3>Applications Status:</h3>
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
				<h3>Applications Public:</h3>
				<select onChange={e => setPub(e.target.value)} value={pub}>
					<option value={'true'}>True</option>
					<option value={'false'}>False</option>
				</select>
				<input type="submit" value="Submit" />
			</form>
			<br />
			<h3>Mass Emails Sent:</h3>
			{emailsSent ? formatDate(emailsSent) : 'Not Yet!'}
			<br />
			<br />
			<button onClick={onSendMassEmails}>Send Emails</button>
		</div>
	);
};

Admin.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.ADMIN] })) return {};
	try {
		const globals = await fetchGlobals(ctx);
		return globals;
	} catch (error) {
		ctx.store.dispatch(sendErrorMessage(err(error), ctx) as any);
		return {
			applicationsPublic: false,
			applicationsStatus: ApplicationsStatus.OPEN,
			emailsSent: null
		};
	}
};

export const AdminPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Admin);
