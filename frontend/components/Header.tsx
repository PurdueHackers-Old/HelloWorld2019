import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { sendFlashMessage, signOut } from '../redux/actions';

const Header = ({ token }) => {
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
};

const mapStateToProps = state => ({
	token: !!state.sessionState.token
});

export default connect(
	mapStateToProps,
	{ logout: signOut, flash: sendFlashMessage }
)(Header);
