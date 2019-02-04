import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = { msgGreen: string; msgRed: string };

// class FlashMessage extends Component<Props> {
// 	static defaultProps = {
// 		msgGreen: '',
// 		msgRed: ''
// 	};

// 	render = () => (
// 		<React.Fragment>
// 			{this.props.msgGreen && (
// 				<div className="section alert-section" style={{ paddingTop: 0 }}>
// 					<div className="section-container">
// 						<div className="alert alert-success" role="alert">
// 							{this.props.msgGreen}
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			{this.props.msgRed && (
// 				<div className="section alert-section" style={{ paddingTop: 0 }}>
// 					<div className="section-container">
// 						<div className="alert alert-danger" role="alert">
// 							{this.props.msgRed}
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</React.Fragment>
// 	);
// }

// const mapStateToProps = state => ({
// 	...state.flashState
// });

// export default connect(mapStateToProps)(FlashMessage);

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

const mapStateToProps = state => ({
	...state.flashState
});

export default FlashMessage;
