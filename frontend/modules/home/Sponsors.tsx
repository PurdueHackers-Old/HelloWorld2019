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
						href="mailto:helloworldpurdue@gmail.com"
						style={{ color: 'white' }}
					>
						helloworldpurdue@gmail.com
					</a>{' '}
					for more details!
				</p>
			</div>
		</div>
		<div className="uk-container fullwidth uk-flex uk-flex-between uk-flex-wrap">
			<SponsorCard src="/static/images/sponsors/cummins.png" title="Cummins" />
			<SponsorCard src="/static/images/sponsors/soga.png" title="SOGA" />
			<SponsorCard src="/static/images/sponsors/cs_department.png" title="CS Department" />
			<SponsorCard src="/static/images/sponsors/microsoft.png" title="Microsoft" />
			<SponsorCard src="/static/images/sponsors/agorize.png" title="Agorize" />
			<SponsorCard src="/static/images/sponsors/gwc.png" title="Girls Who Code" />
			<SponsorCard src="/static/images/sponsors/sugarcrm.png" title="SugarCRM" />
		</div>
	</div>
);
