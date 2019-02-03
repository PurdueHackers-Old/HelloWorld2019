import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { sendFlashMessage, signOut } from '../redux/actions';

class Header extends Component {
	render() {
		const { token } = this.props;
		return (
			<div>
				<Link href="/">
					<a>Home</a>
				</Link>{' '}
				|{' '}
				{token && (
					<Link href="/logout">
						<a>Logout</a>
					</Link>
				)}
				{!token && (
					<>
						<Link href="/login">
							<a>Login</a>
						</Link>{' '}
						|{' '}
						<Link href="/signup">
							<a>Signup</a>
						</Link>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	token: !!state.sessionState.token
});

export default connect(
	mapStateToProps,
	{ logout: signOut, flash: sendFlashMessage }
)(Header);
