// export default class Logout extends Component {
// 	componentDidMount() {
// 	  signOut();
// 	  return {};
// 	}
// 	render() {
// 	  return null;
// 	}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import redirect from '../utils/redirect';
import { sendFlashMessage, signOut } from '../redux/actions';

class Logout extends Component {
	componentDidMount() {
		Router.push('/');
		this.props.logout();
		this.props.flash('Successfully logged out');
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => ({
	token: !!state.sessionState.token
});

export default connect(
	mapStateToProps,
	{ logout: signOut, flash: sendFlashMessage }
)(Logout);
