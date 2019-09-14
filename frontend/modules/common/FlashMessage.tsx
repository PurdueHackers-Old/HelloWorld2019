import React, { useEffect } from 'react';
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
			{red && (
				<div
					className="uk-notification uk-notification-top-center uk-alert-danger"
					style={{ display: 'block' }}
				>
					<div
						className="uk-notification-message uk-notification-message-danger"
						style={{ opacity: 1, marginTop: '0px', background: 'unset' }}
					>
						{' '}
						<a
							href="#"
							className="uk-alert-close uk-icon uk-close"
							data-uk-close=""
							onClick={() => clear()}
							style={{ color: 'black' }}
						>
							<svg
								width="14"
								height="14"
								viewBox="0 0 14 14"
								xmlns="http://www.w3.org/2000/svg"
								data-svg="close-icon"
							>
								<line
									fill="none"
									stroke="#000"
									strokeWidth="1.1"
									x1="1"
									y1="1"
									x2="13"
									y2="13"
								></line>
								<line
									fill="none"
									stroke="#000"
									strokeWidth="1.1"
									x1="13"
									y1="1"
									x2="1"
									y2="13"
								></line>
							</svg>
						</a>{' '}
						<div>{red}</div>{' '}
					</div>
				</div>
			)}

			{green && (
				<div
					className="uk-notification uk-notification-top-center uk-alert-success"
					style={{ display: 'block' }}
				>
					<div
						className="uk-notification-message uk-notification-message-success"
						style={{
							opacity: 1,
							marginTop: '0px',
							background: 'unset'
						}}
					>
						{' '}
						<a
							href="#"
							className="uk-alert-close uk-icon uk-close"
							data-uk-close=""
							onClick={() => clear()}
							style={{ color: 'black' }}
						>
							<svg
								width="14"
								height="14"
								viewBox="0 0 14 14"
								xmlns="http://www.w3.org/2000/svg"
								data-svg="close-icon"
							>
								<line
									fill="none"
									stroke="#000"
									strokeWidth="1.1"
									x1="1"
									y1="1"
									x2="13"
									y2="13"
								></line>
								<line
									fill="none"
									stroke="#000"
									strokeWidth="1.1"
									x1="13"
									y1="1"
									x2="1"
									y2="13"
								></line>
							</svg>
						</a>{' '}
						<div>{green}</div>{' '}
					</div>
				</div>
			)}
			{/* {red && (
				<div className="uk-container-fluid" style={{ marginBottom: 40 }}>
					<div
						className="uk-alert-danger fullwidth"
						uk-alert="true"
						style={{
							padding: 15,
							textAlign: 'center',
							marginBottom: 0
							// position: 'fixed'
						}}
					>
						<a
							className="uk-alert-close uk-icon uk-close"
							uk-close="true"
							style={{ opacity: 'unset' }}
							onClick={() => clear()}
						/>
						<p>{red}</p>
					</div>
				</div>
			)} */}
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
