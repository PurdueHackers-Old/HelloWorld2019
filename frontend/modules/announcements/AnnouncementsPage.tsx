import React from 'react';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { err, endResponse } from '../../utils';
import { connect } from 'react-redux';
import { IContext } from '../../@types';

interface Props {
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

const Announcements = ({ flashError, flashSuccess, clear }: Props) => {
	return <h3>Announcements Page</h3>;
};

Announcements.getInitialProps = async (ctx: IContext) => {};

export const AnnouncementsPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Announcements);
