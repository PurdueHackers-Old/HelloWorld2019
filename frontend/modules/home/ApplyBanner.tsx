import React from 'react';
import Link from 'next/link';

export const ApplyBanner = () => (
	<div className="uk-section uk-section uk-flex uk-flex-around uk-flex-wrap">
		<div className="uk-container uk-container-small fullwidth uk-margin-top">
			<div>
				<h1 className="h2-purple uk-heading text-align-center">Purdue's beginner-oriented hackathon.</h1>
				<hr />
				<h2 className="h2-purple text-align-center">Reach new heights.</h2>
				{/* <h2 className="h2-light">Reach new heights.</h2> */}
				<div className="uk-container-large fullwidth" style={{ textAlign: "center" }}>
					<Link href="/apply">
						<a className="uk-button uk-button-large uk-margin-top uk-align-center">Apply</a>
					</Link>
				</div>
			</div>
		</div>
	</div>
);
