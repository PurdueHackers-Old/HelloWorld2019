import React from 'react';
import Link from 'next/link';
import { Role } from '../../../shared/user.enums';
import { roleMatches } from '../../utils/session';

interface Props {
	token?: string;
	role?: Role;
}

const AccountDropdown = ({ token }: { token?: string }) =>
	token ? (
		<li>
			<a href="#">Account</a>
			<div className="uk-navbar-dropdown">
				<ul className="uk-nav uk-navbar-dropdown-nav">
					<li>
						<Link href="/profile">
							<a>Profile</a>
						</Link>
					</li>
					<li>
						<Link href="/logout">
							<a>Logout</a>
						</Link>
					</li>
				</ul>
			</div>
		</li>
	) : (
		<li>
			<a href="#">Account</a>
			<div className="uk-navbar-dropdown">
				<ul className="uk-nav uk-navbar-dropdown-nav">
					<li>
						<Link href="/login">
							<a>Login</a>
						</Link>
					</li>
					<li>
						<Link href="/signup">
							<a>Signup</a>
						</Link>
					</li>
				</ul>
			</div>
		</li>
	);

const ManageDropdown = ({ role }: { role?: Role }) => {
	if (!role || !roleMatches(role, Role.EXEC)) return null;
	return (
		<li>
			<a href="#">Manage</a>
			<div className="uk-navbar-dropdown">
				<ul className="uk-nav uk-navbar-dropdown-nav">
					<li>
						<Link href="/dashboard">
							<a>Dashboard</a>
						</Link>
					</li>
					{role && roleMatches(role, Role.ADMIN) && (
						<li>
							<Link href="/admin">
								<a>Admin</a>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</li>
	);
};

const Navigation = ({ token, role }: Props) => {
	return (
		<div className="uk-position-top">
			<nav className="uk-navbar-container uk-navbar-transparent uk-navbar" uk-navbar="true">
				<div className="uk-navbar-left uk-flex uk-flex-middle">
					<Link href="/">
						<a className="uk-navbar-item uk-logo">
							<img
								alt="logo"
								className="logo"
								src="/static/images/icons/icon-72x72.png"
							/>
						</a>
					</Link>
					<h3 className="h3-light no-margin uk-visible@m">Hello World</h3>
				</div>
				<div className="uk-navbar-right uk-flex uk-flex-middle uk-visible@m">
					<ul className="uk-navbar-nav">
						<li>
							<Link href="/announcements">
								<a>Announcements</a>
							</Link>
						</li>
						<li>
							<a href="#schedule">Schedule</a>
						</li>
						<li>
							<a href="#faq">FAQ</a>
						</li>
						<li>
							<a href="#sponsors">Sponsors</a>
						</li>
						<ManageDropdown role={role} />
						<AccountDropdown token={token} />
					</ul>
				</div>
			</nav>
		</div>

		// <Navbar variant="dark" expand="sm" fixed="top">
		// 	<Navbar.Toggle aria-controls="basic-navbar-nav" />
		// 	<Navbar.Collapse>
		// 		{/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
		// 		<Nav className="mr-auto">
		// 			<Link href="/" passHref>
		// 				<Nav.Link>Home</Nav.Link>
		// 			</Link>
		// 			<Link href="/announcements" passHref>
		// 				<Nav.Link>Announcements</Nav.Link>
		// 			</Link>
		// 			{role && roleMatches(role, Role.EXEC) && (
		// 				<Link href="/dashboard" passHref>
		// 					<Nav.Link>Dashboard</Nav.Link>
		// 				</Link>
		// 			)}
		// 			{role && roleMatches(role, Role.ADMIN) && (
		// 				<Link href="/admin" passHref>
		// 					<Nav.Link>Admin</Nav.Link>
		// 				</Link>
		// 			)}
		// 			{token && (
		// 				<Link href="/profile" passHref>
		// 					<Nav.Link>Profile</Nav.Link>
		// 				</Link>
		// 			)}
		// 			{token && (
		// 				<Link href="/logout" passHref>
		// 					<Nav.Link>Logout</Nav.Link>
		// 				</Link>
		// 			)}
		// 			{!token && (
		// 				<>
		// 					<Link href="/login" passHref>
		// 						<Nav.Link>Login</Nav.Link>
		// 					</Link>
		// 					<Link href="/signup" passHref>
		// 						<Nav.Link>Signup</Nav.Link>
		// 					</Link>
		// 				</>
		// 			)}
		// 		</Nav>
		// 	</Navbar.Collapse>
		// </Navbar>
	);
};

export default Navigation;
