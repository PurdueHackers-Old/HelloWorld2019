import { Component } from 'react';
import { connect } from 'react-redux';
import { sendFlashMessage } from '../redux/actions';
import { redirect } from '../utils/session';

type DispatchToProps = {
	flash: (msg: any, type?: string) => void;
};

type Props = {
	to: string;
	msgGreen?: string;
	msgRed?: string;
} & DispatchToProps;

class Redirect extends Component<Props> {
	componentDidMount() {
		const { to, flash, msgGreen, msgRed } = this.props;
		redirect(to);
		if (msgRed) flash(msgRed);
		else if (msgGreen) flash(msgGreen, 'green');
	}

	render() {
		return null;
	}
}

export default connect<{}, DispatchToProps>(
	() => ({}),
	{ flash: sendFlashMessage }
)(Redirect);
