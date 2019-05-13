import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IContext, IStoreState, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { getOwnApplication } from '../../redux/actions';
import { QRCode } from './QRCode';
import { Status } from '../../../shared/app.enums';
import { endResponse } from '../../utils';

type Props = { email: string };

const Profile = (props: Props) => {
	const { email } = props;

	const [application, setApplication] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const ownApplication = await getOwnApplication(null);
			setApplication(ownApplication);

			setLoading(false);
		};

		fetchData();
	}, [loading]);

	if (loading) return <span>Loading...</span>;
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
	if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must be logged in!' }))
		return endResponse(ctx);
};

export const ProfilePage = connect((state: IStoreState) => ({
	email: state.sessionState.user.email
}))(Profile);
