import React from 'react';
import { connect } from 'react-redux';
import { IContext, IStoreState, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { getOwnApplication } from '../../redux/actions';
import { QRCode } from './QRCode';
import { Status } from '../../../shared/app.enums';

type Props = { email: string; application: IApplication };

const Profile = (props: Props) => {
	const { email, application } = props;
	return (
		<div>
			<h2>Profile Page</h2>
			<h4>Application Status:</h4>
			{!application ? (
				<div>You have not applied yet!</div>
			) : application.statusPublic !== Status.ACCEPTED ? (
				<div>{application.statusPublic}</div>
			) : (
				<div>
					<b>{application.statusPublic}</b>
					<h4>QR Code:</h4>
					<QRCode email={email} />
				</div>
			)}
		</div>
	);
};

Profile.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must be logged in!' })) return {};
	let application: IApplication;
	try {
		application = await getOwnApplication(ctx);
		// tslint:disable-next-line: no-empty
	} catch {}
	return { application };
};

export const ProfilePage = connect((state: IStoreState) => ({
	email: state.sessionState.user.email
}))(Profile);
