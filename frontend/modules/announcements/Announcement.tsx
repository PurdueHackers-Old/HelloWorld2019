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
	const { _id, title, body, labels, createdAt, released, admin,} = props;
	let date = new Date(createdAt)
	let hours = date.getHours()
	if (hours >= 12) {
		hours = hours - 12
	}

	return (
		<div
			className="uk-card  uk-card-body bg-purple-gradient uk-margin-small-left 
			uk-margin-small-right uk-margin-small-left uk-margin-medium-bottom ancmnt-card uk-padding-small fullwidth"
		>
			<div className="uk-flex">
				<div className={`text-white label label-${labels}`}>{labels}</div>
				<div className="uk-align-right timestamp text-white label">
					{`${hours < 10 ? "0" + hours: hours}:
					 	${date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}
						${date.getHours() < 12 ? "AM": "PM"}`}
				</div>
			</div>
			<h3 className="uk-card-title text-yellow margin-small">{title}</h3>
			<div className="text-white">{body}</div>
			{/* {!released && (
				<button id={_id} onClick={(e: any) => onRelease(e.target.id)}>
				Release
				</button>
			)} */}
			{/* <hr /> */}
			{admin && <AdminActions {...props} />}
			<br />
		</div>
	);
};
