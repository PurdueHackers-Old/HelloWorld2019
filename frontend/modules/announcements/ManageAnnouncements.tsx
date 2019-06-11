import React, { Component } from 'react';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { err, endResponse } from '../../utils';
import { connect } from 'react-redux';
import { IContext, IAnnouncement } from '../../@types';
import { getAllAnnouncementDrafts, releaseAnnouncement } from '../../api';
import Announcement from './Announcement';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { Role } from '../../../shared/user.enums';

interface Props {
	announcements: IAnnouncement[];
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

const ManageAnnouncements = ({ announcements, clear, flashError, flashSuccess }: Props) => {
	const onRelease = async (id: string) => {
		try {
			clear();
			console.log('Releasing announcement:', id);
			await releaseAnnouncement(id);
			flashSuccess('Successfully released announcement!');
		} catch (error) {
			flashError(err(error));
		}
	};

	return (
		<div>
			<h3>Manage Announcements</h3>
			{announcements &&
				announcements.map(announcement => (
					<Announcement key={announcement._id} {...announcement} onRelease={onRelease} />
				))}
		</div>
	);
};

ManageAnnouncements.getInitialProps = async (ctx: IContext) => {
	try {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return endResponse(ctx);
		const announcements = await getAllAnnouncementDrafts(ctx);
		return { announcements };
	} catch (error) {
		return { announcements: [] };
	}
};

export const ManageAnnouncementsPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(ManageAnnouncements);
