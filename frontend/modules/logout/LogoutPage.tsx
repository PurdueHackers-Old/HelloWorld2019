import { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions';
import Redirect from '../common/Redirect';

type Props = { logout: () => Promise<void> };

@((connect as any)(null, { logout: signOut }))
export class LogoutPage extends Component<Props> {
	componentWillMount = () => {
		this.props.logout();
	};

	render() {
		return <Redirect to="/" green="Successfully logged out" />;
	}
}
