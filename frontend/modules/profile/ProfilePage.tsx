import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { IContext, IStoreState } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';

// @ts-ignore
const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

type Props = { email: string };

const Profile = ({ email }: Props) => {
	return (
		<div>
			<h3>Profile Page</h3>
			QR Code:
			<br />
			<QRCode size={128} value={email} renderAs="svg" />
		</div>
	);
};

Profile.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must be logged in!' })) return {};
};

export const ProfilePage = connect((state: IStoreState) => ({
	email: state.sessionState.user.email
}))(Profile);
