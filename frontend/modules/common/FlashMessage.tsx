import React from 'react';

interface Props {
	green: string;
	red: string;
}

const FlashMessage = ({ green, red }: Props) => {
	return (
		<React.Fragment>
			{green && (
				<div
					className="uk-alert-success"
					uk-alert="true"
					uk-sticky="bottom: #offset"
					style={{ padding: 15, textAlign: 'center', marginBottom: 0 }}
				>
					<a className="uk-alert-close" uk-close="true" style={{ opacity: 'unset' }} />
					<p>{green}</p>
				</div>
			)}
			{red && (
				<div
					className="uk-alert-danger"
					uk-alert="true"
					uk-sticky="bottom: #offset"
					style={{ padding: 15, textAlign: 'center', marginBottom: 0 }}
				>
					<a className="uk-alert-close" uk-close="true" style={{ opacity: 'unset' }} />
					<p>{red}</p>
				</div>
			)}
		</React.Fragment>
	);
};

FlashMessage.defaultProps = {
	green: '',
	red: ''
};

export default FlashMessage;
