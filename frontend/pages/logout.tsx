import { Component } from 'react';
import { connect } from 'react-redux';
import { sendFlashMessage, signOut } from '../redux/actions';
import Redirect from '../components/Redirect';

type Props = { logout: () => Promise<void>; flash: (msg: any, type?: string) => void };

class Logout extends Component<Props> {
	componentWillMount = () => {
		this.props.logout();
	};

	render() {
		return <Redirect to="/" msgGreen="Successfully logged out" />;
	}
}

const mapStateToProps = state => ({
	token: !!state.sessionState.token
});

export default connect(
	mapStateToProps,
	{ logout: signOut, flash: sendFlashMessage }
)(Logout);
