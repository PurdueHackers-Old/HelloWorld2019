import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { sendErrorMessage } from '../../redux/actions';
import { IContext } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err, endResponse } from '../../utils';
import { Role } from '../../../shared/user.enums';
import { getStats } from '../../api';

interface Props {
	flashError: (msg: string, ctx?: IContext) => void;
}

export const Dashboard = ({ flashError }: Props) => {
	const [state, setState] = useState({
		total: 0,
		pending: 0,
		accepted: 0,
		rejected: 0,
		waitlist: 0,
		loading: true
	});

	useEffect(() => {
		getStats()
			.then(stats => setState({ ...stats, loading: false }))
			.catch(error => {
				setState({ ...state, loading: false });
				flashError(err(error));
			});
	}, []);

	if (state.loading) return <span>Loading...</span>;
	return (
		<div id="background-announcement" className="uk-section bg-purple-gradient uk-section-default uk-flex hero fullscreen">
			<h1
				className="text-yellow uk-heading-small uk-margin-large-top uk-margin-large-left uk-padding-large-top"
			>
				Dashboard
			</h1>
			{/* <div style={{ height: '300px' }}></div> */}
			<br />
			<br />
			<div className="uk-container text-yellow">
				Application Stats:
			<br />
				Total: {state.total}
				<br />
				Pending: {state.pending}
				<br />
				Accepted: {state.accepted}
				<br />
				Rejected: {state.rejected}
				<br />
				Waitlist: {state.waitlist}
				<br />
				<br />
				Admin Actions:
			<br />
				<div className="uk-container">
					<div className="uk-button-ancmnt">
						<Link href="/applications" prefetch>
							<a>Applications</a>
						</Link>
					</div>
					<br />
					<div className="uk-button-ancmnt">
						<Link href="/announcements/new">
							<a>Create Announcement</a>
						</Link>
					</div>
					<br />
					<div className="uk-button-ancmnt">
						<Link href="/announcements/manage">
							<a>Manage Announcements</a>
						</Link>
					</div>
					<br />
					<div className="uk-button-ancmnt">
						<Link href="/checkin">
							<a>Check In</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

Dashboard.getInitialProps = (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return endResponse(ctx);
};

export const DashboardPage = connect(
	null,
	{ flashError: sendErrorMessage }
)(Dashboard);
