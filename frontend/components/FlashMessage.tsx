import React from 'react';

type Props = { msgGreen: string; msgRed: string };

const defaultProps: Props = {
	msgGreen: '',
	msgRed: ''
};

const FlashMessage = ({ msgGreen, msgRed } = defaultProps) => {
	return (
		<React.Fragment>
			{msgGreen && (
				<div className="section alert-section" style={{ paddingTop: 0 }}>
					<div className="section-container">
						<div className="alert alert-success" role="alert">
							{msgGreen}
						</div>
					</div>
				</div>
			)}
			{msgRed && (
				<div className="section alert-section" style={{ paddingTop: 0 }}>
					<div className="section-container">
						<div className="alert alert-danger" role="alert">
							{msgRed}
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default FlashMessage;
