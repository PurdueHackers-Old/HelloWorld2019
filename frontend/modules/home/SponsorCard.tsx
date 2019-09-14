import React from 'react';

interface Props {
	src: string;
	title: string;
}

const SponsorCard = ({ src, title }: Props) => {
	return (
		<div className="uk-padding-small uk-width-1-3@m">
			<div className="uk-card uk-card-body fullheight uk-light uk-card-default sponsor-card">
				<img src={src} alt={title} title={title} />
			</div>
		</div>
	);
};

export default SponsorCard;
