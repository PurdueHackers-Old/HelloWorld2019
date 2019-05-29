import React, { Component, useEffect } from 'react';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { err, endResponse } from '../../utils';
import { connect } from 'react-redux';
import { IContext, IAnnouncement } from '../../@types';
import { getAllAnnouncements } from '../../api';

interface Props {
	announcements: IAnnouncement[];
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

export const Announcements = (props: Props) => {
	useEffect(() => {
		const handleMessage = event => {
			console.log('Client Received Message: ', event.data);
		};
		navigator.serviceWorker.addEventListener('message', handleMessage);
		return () => {
			navigator.serviceWorker.removeEventListener('message', handleMessage);
		};
	}, []);

	return (
		<div>
			<h3>Announcements Page</h3>
		</div>
	);
};

Announcements.getInitialProps = async ctx => {
	try {
		const announcements = await getAllAnnouncements(ctx);
		return announcements;
	} catch (error) {
		return [];
	}
};

export const AnnouncementsPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Announcements);
