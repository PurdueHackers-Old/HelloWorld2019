import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { signIn, sendFlashMessage } from '../redux/actions';
import { ISessionState } from '../redux/reducers/session';
import { ILoginUser, ILoginResponse } from '../@types';
import ProtectedRoute from '../components/ProtectedRoute';

type Props = {
	signin: (body: ILoginUser) => Promise<ILoginResponse>;
	flash: (msg: any, type?: string) => void;
} & ISessionState;

class ApplyPage extends Component<Props> {
	// static getInitialProps = ctx => {
	// 	redirectIfNotAuthenticated('/', ctx);
	// 	return {};
	// };

	render() {
		return (
			<div>
				Apply Page
				<br />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

const ConnectedApply = connect(
	mapStateToProps,
	{ signin: signIn, flash: sendFlashMessage }
)(ApplyPage);

export default ProtectedRoute(ConnectedApply, 'To apply, please login or create an account');
