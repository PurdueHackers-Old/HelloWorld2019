import React, { Component } from 'react';
import { sendErrorMessage, getStats } from '../../redux/actions';
import { IContext, IStatsResponse } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';
import Link from 'next/link';

type Props = {
	stats: IStatsResponse;
};

export class DashboardPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			const stats = await getStats(ctx);
			return { stats };
		} catch (error) {
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
		}
	};

	state = { total: 0, pending: 0, accepted: 0, rejected: 0, waitlist: 0, ...this.props.stats };

	render() {
		return (
			<div>
				Dashboard
				<br />
				<br />
				Application Stats:
				<br />
				Total: {this.state.total}
				<br />
				Pending: {this.state.pending}
				<br />
				Accepted: {this.state.accepted}
				<br />
				Rejected: {this.state.rejected}
				<br />
				Waitlist: {this.state.waitlist}
				<br />
				<br />
				Admin Actions:
				<br />
				<Link href="/applications">
					<a>Applications</a>
				</Link>
				<br />
				<Link href="/announcement">
					<a>Post Announcement</a>
				</Link>
				<br />
				<Link href="/announcements">
					<a>View Announcements</a>
				</Link>
				<br />
				<Link href="/checkin">
					<a>Check In</a>
				</Link>
			</div>
		);
	}
}
