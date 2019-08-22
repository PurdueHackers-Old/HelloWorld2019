import React from 'react';
import { connect } from 'react-redux';
import { clearFlashMessages } from '../../redux/actions';
import { IContext } from '../../@types';

interface Props {
	green: string;
	red: string;
	clear: (ctx?: IContext) => void;
}

const FlashMessage = ({ green, red, clear }: Props) => {
	return (
		<React.Fragment>
			{green && (
				<div
					className="uk-alert-success"
					uk-alert="true"
					style={{ padding: 15, textAlign: 'center', marginBottom: 0 }}
				>
					<a
						className="uk-alert-close"
						uk-close="true"
						style={{ opacity: 'unset' }}
						onClick={() => clear()}
					/>
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
				<div
					className="uk-alert-danger"
					uk-alert="true"
					style={{ padding: 15, textAlign: 'center', marginBottom: 0 }}
				>
					<a
						className="uk-alert-close"
						uk-close="true"
						style={{ opacity: 'unset' }}
						onClick={() => clear()}
					/>
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

export default connect(
	null,
	{ clear: clearFlashMessages }
)(FlashMessage);
