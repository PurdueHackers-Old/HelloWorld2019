import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IContext, IStoreState, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { QRCode } from './QRCode';
import { Status } from '../../../shared/app.enums';
import { endResponse } from '../../utils';
import { getOwnApplication } from '../../api';
import Link from 'next/link';
import { requestNotificationPermission } from '../../utils/service-worker';

interface Props {
	email: string;
}

const Profile = ({ email }: Props) => {
	const [application, setApplication] = useState<IApplication>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const ownApplication = await getOwnApplication(null);
			setApplication(ownApplication);

			setLoading(false);
		};

		fetchData();
	}, [loading]);

	const onNotifcationClick = async () => {
		const permission = await requestNotificationPermission();
		if (permission !== 'granted') console.error('Permission not granted for notifications');
	};

	if (loading) return <span>Loading...</span>;
	return (
		<div
			className="uk-section uk-section-primary uk-flex uk-flex-center bg-purple-gradient"
			id="schedule"
			style={{ paddingBottom: 0, minHeight: '100vh' }}
		>
			<div className="uk-container-small fullwidth uk-margin-large-bottom">
				<h2 className="h1-light text-yellow">Profile</h2>
				<Link href="/apply">
					<a>
						<h4>View Application</h4>
					</a>
				</Link>

				<a
					className="uk-button uk-button-large uk-margin-top uk-align-center"
					onClick={onNotifcationClick}
				>
					Enable Push Notifications
				</a>

				<h4>Application Status:</h4>
				{!application ? (
					<div>You have not applied yet!</div>
				) : application.statusPublic !== Status.ACCEPTED ? (
					<u>
						<h4 style={{ color: 'orange' }}>{application.statusPublic}</h4>
					</u>
				) : (
					<div>
						<u>
							<h4 style={{ color: 'palegreen' }}>{application.statusPublic}</h4>
						</u>
						<h4>QR Code:</h4>
						<QRCode email={email} />
					</div>
				)}
			</div>
		</div>
	);
};

Profile.getInitialProps = (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/login', ctx, { msg: 'You must be logged in!' }))
		return endResponse(ctx);
};

export const ProfilePage = connect((state: IStoreState) => ({
	email: state.sessionState.user.email
}))(Profile);
