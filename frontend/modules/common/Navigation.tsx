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
					<a className="text-purple-link">Profile</a>
				</Link>
			</li>
			<li>
				<Link href="/logout">
					<a className="text-purple-link">Logout</a>
				</Link>
			</li>
		</>
	) : (
			<>
				<li>
					<Link href="/login">
						<a className="text-purple-link">Login</a>
					</Link>
				</li>
				<li>
					<Link href="/signup">
						<a className="text-purple-link">Signup</a>
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
					<a className="text-purple-link">Dashboard</a>
				</Link>
			</li>
			{role && roleMatches(role, Role.ADMIN) && (
				<li>
					<Link href="/admin">
						<a className="text-purple-link">Admin</a>
					</Link>
				</li>
			)}
		</>
	);
};

const Navigation = ({ token, role }: Props) => {
	return (
		<div className="uk-position-top" style={{ top: 'unset' }}>
			{/* <div style={{ zIndex: 5 }} 
				uk-sticky="sel-target: .uk-navbar;
				cls-active: uk-navbar-sticky;
				cls-inactive: uk-navbar-transparent;
				bottom: 230px;"> */}
			<nav
				id="navbar"
				className="uk-container uk-navbar-transparent uk-navbar"
				uk-navbar="true"
			>
				<div className="uk-navbar-left uk-flex uk-flex-middle">
					<Link href="/">
						<a
							className="uk-navbar-item"
							style={{ color: '#f39c12', textDecoration: 'none' }}
						>
							{/* <img
								alt="logo"
								className="logo"
								src="/static/images/icons/icon-72x72.png"
							/> */}
							<h3 className="h2-light no-margin text-yellow">Hello World</h3>
						</a>
					</Link>
				</div>
				<div className="uk-navbar-right">
					<ul className="uk-navbar-nav uk-visible@s">
						{/* <li>
							<Link href="/announcements">
								<a className="text-yellow">Announcements</a>
							</Link>
						</li> */}
						<li>
							<Link href="/#schedule">
								<a className="text-yellow">Schedule</a>
							</Link>
						</li>
						<li>
							<Link href="/#faq">
								<a className="text-yellow">FAQ</a>
							</Link>
						</li>
						<li>
							<Link href="/announcements">
								<a className="text-yellow">Announcements</a>
							</Link>
						</li>
						{!role || !roleMatches(role, Role.EXEC) ? null : (
							<li>
								<a href="#" className="text-yellow">
									Manage
								</a>
								<div
									className="uk-navbar-dropdown bg-yellow"
									style={{ borderRadius: '10px' }}
								>
									<ul className="uk-nav uk-navbar-dropdown-nav">
										<ManageDropdown role={role} />
									</ul>
								</div>
							</li>
						)}
						<li>
							<a href="#" className="text-yellow">
								Account
							</a>
							<div
								className="uk-navbar-dropdown bg-yellow"
								style={{ borderRadius: '10px' }}
							>
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
							fill="#f39c12"
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
				<div className="uk-offcanvas-bar bg-yellow" uk-navbar="mode: click">
					<ul className="uk-nav">
						{/* <li>
							<Link href="/announcements">
								<a>Announcements</a>
							</Link>
						</li> */}
						<li>
							<Link href="/">
								<a>Home</a>
							</Link>
						</li>
						<ManageDropdown role={role} />
						<AccountDropdown token={token} />
					</ul>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
};

export default Navigation;
