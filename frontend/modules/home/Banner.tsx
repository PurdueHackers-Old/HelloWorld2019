import React from 'react';

export const Banner = () => (
	<div className="uk-section section-primary uk-section-default uk-flex hero">
		<div
			className="uk-container uk-container-small fullwidth uk-margin-large-top"
			style={{ zIndex: 1, padding: 0 }}
		>
			<div>
				<h1 className="h1-light">
					Purdue&apos;s
					<br />
					freshman-only
					<br />
					hackathon.
				</h1>
				<a
					className="uk-button p-large-light uk-margin-top"
					href="http://bit.ly/hw2018slack"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'white !important' }}
				>
					Slack
				</a>
				<a
					className="uk-button p-large-light uk-margin-top uk-margin-left"
					href="https://helpq-helloworld.herokuapp.com/"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'white !important' }}
				>
					HELPq
				</a>
			</div>
		</div>
		<div className="hero-img-container">
			{/* <img src="/static/images/icons/icon-512x512.png" className="hero-img" /> */}
		</div>
	</div>
);
