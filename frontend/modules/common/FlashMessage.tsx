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
