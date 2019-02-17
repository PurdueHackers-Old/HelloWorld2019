import { Component } from 'react';
import { connect } from 'react-redux';
import { sendErrorMessage, sendSuccessMessage } from '../../redux/actions';
import { redirect } from '../../utils/session';
import { IContext, flashColor } from '../../@types';

type DispatchToProps = {
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
};

type Props = {
	to: string;
	green?: string;
	red?: string;
} & DispatchToProps;

class Redirect extends Component<Props> {
	componentDidMount() {
		const { to, flashSuccess, flashError, green, red } = this.props;
		redirect(to);
		if (red) flashError(red);
		else if (green) flashSuccess(green);
	}

	render() {
		return null;
	}
}

export default connect<{}, DispatchToProps>(
	null,
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage }
)(Redirect);
