import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import FlashMessage from './FlashMessage';

type StateToProps = {
	token: string;
	msgGreen: string;
	msgRed: string;
};

const Layout = ({ token, msgGreen, msgRed, children }) => {
	return (
		<div>
			<Header token={token} />
			<FlashMessage msgGreen={msgGreen} msgRed={msgRed} />
			{children}
		</div>
	);
};

const mapStateToProps = state => ({
	token: state.sessionState.token,
	...state.flashState
});

export default connect<StateToProps>(mapStateToProps)(Layout);
