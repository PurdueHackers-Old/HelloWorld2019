import React from 'react';
import { IAnnouncement } from '../../@types';

interface IAdminActions {
	onRelease: (id: string) => void;
	onDelete: (id: string) => void;
}

interface Props extends IAnnouncement {
	admin?: IAdminActions;
}

const AdminActions = ({ _id, released, admin: { onRelease, onDelete } }: Props) => {
	return (
		<>
			{!released && (
				<button
					id={_id}
					className="uk-button-ancmnt uk-margin-medium-right"
					onClick={(e: any) => onRelease(e.target.id)}
				>
					Release
				</button>
			)}
			<button
				id={_id}
				className="uk-button-ancmnt uk-margin-medium-right"
				onClick={(e: any) => onDelete(e.target.id)}
			>
				Delete
			</button>
		</>
	);
};

export default (props: Props) => {
	const { _id, title, body, labels, released, admin } = props;
	return (
		<div
			className="uk-card  uk-card-body bg-purple-gradient uk-margin-small-left 
			uk-margin-small-right uk-margin-medium-bottom ancmnt-card uk-padding-small fullwidth"
		>
			<h3 className="uk-card-title text-yellow">Title: {title}</h3>
			Body: {body}
			<br />
			Labels: {labels}
			<br />
			{/* {!released && (
				<button id={_id} onClick={(e: any) => onRelease(e.target.id)}>
				Release
				</button>
			)} */}
			<hr />
			{admin && <AdminActions {...props} />}
			<br />
		</div>
	);
};
