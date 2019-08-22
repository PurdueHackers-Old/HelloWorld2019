import React from 'react';
import Link from 'next/link';

export const Banner = () => (
	<div className="uk-section section-primary uk-section-default uk-flex hero">
		<div className="uk-container uk-container-small fullwidth uk-margin-large-top">
			<div>
				<h1 className="h1-light uk-heading-xlarge">Hello World</h1>
				<h2 className="h2-light">Purdue&apos;s beginner-oriented hackathon.</h2>
				<hr />
				<h2 className="h2-light">Reach new heights.</h2>
				{/* <h2 className="h2-light">Reach new heights.</h2> */}
				<Link href="/apply">
					<a className="uk-button p-large-light uk-margin-top">Apply Now</a>
				</Link>
			</div>
		</div>
		<div className="hero-img-container">
			{/* <img src="/static/images/icons/icon-512x512.png" className="hero-img" /> */}
		</div>
	</div>
);
