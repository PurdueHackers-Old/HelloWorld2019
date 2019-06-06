import React, { Component, useRef, Fragment } from 'react';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { err, endResponse, formatDateAsTimeLocal } from '../../utils';
import { connect } from 'react-redux';
import { IContext, IAnnouncement, IGlobals } from '../../@types';
import { getAllAnnouncements, createAnnouncement, fetchGlobals } from '../../api';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { Role } from '../../../shared/user.enums';
import { AnnouncementLabel } from '../../../shared/announcement.enums';

interface Props {
	globals: IGlobals;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

export const NewAnnouncement = ({ flashSuccess, flashError, clear, globals }: Props) => {
	const formRef = useRef<HTMLFormElement>();
	const now = useRef(formatDateAsTimeLocal(new Date()));

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			const data = new FormData(formRef.current);
			data.set('broadcastTime', new Date(data.get('broadcastTime').toString()).toUTCString());
			const announcement = await createAnnouncement(data as any);
			flashSuccess('Successfully created announcement');
			console.log('Created annnouncement:', announcement);
		} catch (error) {
			flashError(err(error));
		}
	};

	return (
		<div>
			<h3>Create an announcement</h3>
			<br />
			<form ref={formRef} onSubmit={onSubmit}>
				<label htmlFor="title">
					Title: <input name="title" required />
				</label>
				<br />
				Type:{' '}
				{Object.values(AnnouncementLabel).map(label => (
					<Fragment key={label}>
						<input id={label} type="checkbox" name="labels[]" value={label} />
						<label htmlFor={label}>{label}</label>
						<br />
					</Fragment>
				))}
				<br />
				Broadcast Time:
				<br />
				<input
					type="datetime-local"
					name="broadcastTime"
					min={formatDateAsTimeLocal(new Date(Date.parse(globals.hackingTimeStart)))}
					max={formatDateAsTimeLocal(new Date(Date.parse(globals.hackingTimeEnd)))}
					defaultValue={now.current}
				/>
				Body:
				<br />
				<textarea name="body" />
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

NewAnnouncement.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.MENTOR] })) return endResponse(ctx);
	const globals = await fetchGlobals(ctx);
	return { globals };
};

export const NewAnnouncementPage = connect(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(NewAnnouncement);
