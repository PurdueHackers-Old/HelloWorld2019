import React from 'react';
import './index.scss';

export const Schedule = () => (
	<div
		className="uk-section uk-section-primary uk-flex uk-flex-center bg-purple-gradient"
		id="schedule"
		style={{ paddingBottom: 0 }}
	>
		<div className="uk-container-small fullwidth uk-margin-large-bottom">
			<div className="uk-container-small fullwidth">
				<h2 className="h1-light text-align-center text-yellow">Location</h2>
			</div>
			<div
				style={{
					position: 'relative',
					paddingBottom: '75%',
					height: 0,
					overflow: 'hidden'
				}}
			>
				<iframe
					src="https://calendar.google.com/calendar/embed?src=helloworldpurdue%40gmail.com&ctz=America%2FNew_York&dates=20190901/20190930"
					style={{
						border: 0,
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%'
					}}
					frameBorder="0"
					scrolling="no"
				></iframe>
			</div>

			<hr />

			<div className="uk-container-small fullwidth">
				<h2 className="h1-light text-align-center text-yellow">Location</h2>
			</div>
			<div uk-grid="" className="uk-grid">
				<div className="uk-width-2-3@m uk-first-column">
					<iframe
						title="Location Map"
						allowFullScreen
						frameBorder="0"
						height="300px"
						src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJfw3Ca7LiEogRxUHhdrGHkJo&key=AIzaSyBBVmjYgH5d7sxq0FD3mPvNBdIUxqWURO0"
						style={{ border: 0 }}
						width="100%"
					></iframe>
				</div>
				<div className="uk-width-1-3@m">
					<p className="p-large-yellow">
						<b>Date:</b>
					</p>
					<p className="p-large-yellow"> September 14 - 15 </p>
					<hr />
					<p className="p-large-yellow">
						<b>Location: </b>
					</p>
					<p className="p-large-yellow">Wilmeth Active Learning Center</p>
					<hr />
				</div>
			</div>
		</div>
	</div>
);
