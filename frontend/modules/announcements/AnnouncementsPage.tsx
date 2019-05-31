import React, { Component } from 'react';
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

export class Announcements extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		try {
			const announcements = await getAllAnnouncements(ctx);
			return announcements;
		} catch (error) {
			return [];
		}
	};

	render() {
		return (
			<div>
				<h3>Announcements Page</h3>
			</div>
		);
	}
}

export const AnnouncementsPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Announcements);
