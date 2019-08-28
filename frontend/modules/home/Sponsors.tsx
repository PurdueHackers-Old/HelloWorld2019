import React from 'react';
import SponsorCard from './SponsorCard';

export const Sponsors = () => (
	<div
		className="uk-section uk-flex uk-flex-around uk-flex-wrap bg-purple-gradient"
		id="sponsors"
	>
		<div className="uk-container-small fullwidth">
			<div className="uk-container-small">
				<h2 className="h1-light text-align-center text-yellow">Sponsors</h2>
			</div>
			<div className="uk-container-small">
				<p className="text-yellow text-align-center">
					If you are interested in sponsoring Hello World 2019, email us at{' '}
					<a
						className="uk-link-text"
						href="mailto:2019@helloworldpurdue.com"
						style={{ color: 'white' }}
					>
						2019@helloworldpurdue.com
					</a>{' '}
					for more details!
				</p>
			</div>
		</div>
		<div className="uk-container fullwidth uk-flex uk-flex-between uk-flex-wrap">
			<SponsorCard
				src={require('../../static/images/sponsors/cummins.png')}
				title="Cummins"
			/>
			<SponsorCard src={require('../../static/images/sponsors/soga.png')} title="SOGA" />
			<SponsorCard
				src={require('../../static/images/sponsors/cs_department.jpg')}
				title="CS Department"
			/>
			<SponsorCard
				src={require('../../static/images/sponsors/microsoft.png')}
				title="Microsoft"
			/>
			<SponsorCard
				src={require('../../static/images/sponsors/agorize.png')}
				title="Agorize"
			/>
			<SponsorCard
				src={require('../../static/images/sponsors/gwc.png')}
				title="Girls Who Code"
			/>
			<SponsorCard
				src={require('../../static/images/sponsors/sugarcrm.png')}
				title="SugarCRM"
			/>
		</div>
	</div>
);
