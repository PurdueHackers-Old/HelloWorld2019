import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IContext, IStoreState, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { getOwnApplication } from '../../redux/actions';
import { QRCode } from './QRCode';

type Props = { email: string };

const Profile = (props: Props) => {
	const { email } = props;

	const [application, setApplication] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const ownApplication = await getOwnApplication(null);
			console.log(ownApplication);
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
			{application ? (
				<div>
					<b>{application.statusPublic}</b>
					<h4>QR Code:</h4>
					<QRCode email={email} />
				</div>
			) : (
				<div>You have not applied yet!</div>
			)}
		</div>
	);
};

Profile.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must be logged in!' })) return {};
};

export const ProfilePage = connect((state: IStoreState) => ({
	email: state.sessionState.user.email
}))(Profile);
