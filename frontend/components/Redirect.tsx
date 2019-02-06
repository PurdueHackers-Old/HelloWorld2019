import { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { sendFlashMessage, signOut } from '../redux/actions';

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
		Router.push(to);
		if (msgRed) flash(msgRed);
		else if (msgGreen) flash(msgGreen, 'green');
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => ({});

export default connect<{}, DispatchToProps>(
	mapStateToProps,
	{ flash: sendFlashMessage }
)(Redirect);
