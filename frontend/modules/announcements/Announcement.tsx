import React from 'react';
import { AnnouncementLabel } from '../../../shared/announcement.enums';

interface Props {
	title: string;
	body: string;
	type: AnnouncementLabel;
	createdAt: Date;
	released: boolean;
}

export default ({ title, body, type, released }: Props) => {
	return (
		<div>
			Title: {title}
			<br />
			Body: {body}
			<br />
			Type: {type}
			Released: {released ? 'Yes' : 'No'}
		</div>
	);
};
