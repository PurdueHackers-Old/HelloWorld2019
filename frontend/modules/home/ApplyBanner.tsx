import React from 'react';
import Link from 'next/link';

export const ApplyBanner = () => (
	<div className="uk-section uk-section uk-flex uk-flex-around uk-flex-wrap">
		<div className="uk-container uk-container-small fullwidth uk-margin-top">
			<div>
				<h1 className="h2-purple uk-heading text-align-center">
					Purdue&apos;s beginner-oriented hackathon.
				</h1>
				<hr />
				<h2 className="h2-purple text-align-center">Reach new heights.</h2>
				<div className="uk-container-large fullwidth" style={{ textAlign: 'center' }}>
					<h4 className="h4-purple text-align-center">Applications are now closed!</h4>
					<a
						className="uk-button uk-button-large uk-margin-top uk-align-center"
						rel="noopener noreferrer"
						target="_blank"
						href="https://bit.ly/helloworld2019slack"
					>
						Slack
					</a>
					<a style={{ border: 0 }} className="uk-button uk-button-large"></a>
					<a
						className="uk-button uk-button-large uk-margin-top uk-align-center"
						rel="noopener noreferrer"
						target="_blank"
						href="https://helloworld-helpq.herokuapp.com/"
					>
						HelpQ
					</a>
				</div>
			</div>
		</div>
	</div>
);
