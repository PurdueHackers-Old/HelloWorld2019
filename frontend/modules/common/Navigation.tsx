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
		<>
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
		</>
	) : (
		<>
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
		</>
	);

const ManageDropdown = ({ role }: { role?: Role }) => {
	if (!role || !roleMatches(role, Role.EXEC)) return null;
	return (
		<>
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
		</>
	);
};

const Navigation = ({ token, role }: Props) => {
	return (
		<div className="uk-position-top" style={{ top: 'unset' }}>
			<nav className="uk-container uk-navbar-transparent uk-navbar" uk-navbar="true">
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
				<div className="uk-navbar-right">
					<ul className="uk-navbar-nav uk-visible@s">
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
						{!role || !roleMatches(role, Role.EXEC) ? null : (
							<li>
								<a href="#">Manage</a>
								<div className="uk-navbar-dropdown">
									<ul className="uk-nav uk-navbar-dropdown-nav">
										<ManageDropdown role={role} />
									</ul>
								</div>
							</li>
						)}
						<li>
							<a href="#">Account</a>
							<div className="uk-navbar-dropdown">
								<ul className="uk-nav uk-navbar-dropdown-nav">
									<AccountDropdown token={token} />
								</ul>
							</div>
						</li>
					</ul>
					<a
						href="#"
						className="uk-navbar-toggle uk-hidden@s"
						uk-toggle="target: #sidenav"
					>
						<svg
							fill="white"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							data-svg="navbar-toggle-icon"
						>
							<rect y="9" width="20" height="2"></rect>
							<rect y="3" width="20" height="2"></rect>
							<rect y="15" width="20" height="2"></rect>
						</svg>
					</a>
				</div>
			</nav>
			<div id="sidenav" uk-offcanvas="flip: true" className="uk-offcanvas">
				<div className="uk-offcanvas-bar" uk-navbar="mode: click">
					<ul className="uk-nav">
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
			</div>
		</div>
	);
};

export default Navigation;
