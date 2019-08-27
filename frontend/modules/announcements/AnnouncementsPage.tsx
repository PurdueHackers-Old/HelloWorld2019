import React, { useEffect, useState } from 'react';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { connect } from 'react-redux';
import { IContext, IAnnouncement } from '../../@types';
import { getAllAnnouncements } from '../../api';
import Announcement from './Announcement';
import { isSWSupported } from '../../utils/service-worker';
import './index.scss';

interface Props {
	announcements: IAnnouncement[];
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

export const Announcements = ({ announcements: ancmnts }: Props) => {
	const [announcements, setAnnouncements] = useState(ancmnts);
	useEffect(() => {
		const handleMessage = (e: MessageEvent) => {
			const { message } = e.data;
			if (message.action === 'add') setAnnouncements(prev => [...prev, message.announcement]);
			else if (message.action === 'delete')
				setAnnouncements(prev => prev.filter(a => a._id !== message.announcement._id));
		};

		if (isSWSupported()) navigator.serviceWorker.addEventListener('message', handleMessage);

		return () => {
			if (isSWSupported())
				navigator.serviceWorker.removeEventListener('message', handleMessage);
		};
	}, []);

	return (
		<div
			id="background-announcement"
			style={{
				backgroundImage: `url(${require('../../static/images/DefaultBackground.jpg')})`
			}}
			className="uk-section section-primary uk-section-default uk-flex hero fullscreen"
		>
			<h1
				id="ancmt-heading"
				className="text-yellow uk-heading-small uk-margin-large-top uk-margin-large-left uk-padding-large-top"
			>
				Announcements
			</h1>
			<div
				className="foreground-announcement"
				style={{
					backgroundImage: `url(${require('../../static/images/DefaultForeground.png')})`,
					backgroundPosition: 'center top',
					backgroundSize: 'cover',
					height: '3000px'
				}}
			>
				<div style={{ height: '380px' }}></div>
				<div className="uk-section uk-section uk-flex uk-flex-around uk-flex-wrap">
					{announcements.map(announcement => (
						<Announcement key={announcement._id} {...announcement} />
					))}
				</div>
			</div>
		</div>
	);
};

Announcements.getInitialProps = async (ctx: IContext) => {
	try {
		const announcements = await getAllAnnouncements(ctx, { released: true });
		return { announcements };
	} catch (error) {
		return [];
	}
};

export const AnnouncementsPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Announcements);
