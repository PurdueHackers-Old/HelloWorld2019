import React from 'react';

interface Props {
	green: string;
	red: string;
}

const FlashMessage = ({ green, red }: Props) => {
	return (
		<React.Fragment>
			{green && (
				<div className="uk-alert-success" uk-alert="true" style={{ marginBottom: 0 }}>
					<a className="uk-alert-close" uk-close="true"></a>
					<p>{green}</p>
				</div>
				// <div className="section alert-section" style={{ paddingTop: 0 }}>
				// 	<div className="section-container">
				// 		<div className="alert alert-success" role="alert">
				// 			{green}
				// 		</div>
				// 	</div>
				// </div>
			)}
			{red && (
				<div className="uk-alert-danger" uk-alert="true" style={{ marginBottom: 0 }}>
					<a className="uk-alert-close" uk-close="true"></a>
					<p>{red}</p>
				</div>
				// <div className="section alert-section" style={{ paddingTop: 0 }}>
				// 	<div className="section-container">
				// 		<div className="alert alert-danger" role="alert">
				// 			{red}
				// 		</div>
				// 	</div>
				// </div>
			)}
		</React.Fragment>
	);
};

FlashMessage.defaultProps = {
	green: '',
	red: ''
};

export default FlashMessage;
