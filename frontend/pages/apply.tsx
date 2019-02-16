import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { signIn, sendFlashMessage, getApplication } from '../redux/actions';
import { ISessionState } from '../redux/reducers/session';
import { ILoginUser, ILoginResponse, IContext } from '../@types';
import { redirectIfNotAuthenticated } from '../utils/session';

type Props = {
	signin: (body: ILoginUser) => Promise<ILoginResponse>;
	flash: (msg: any, type?: string) => void;
} & ISessionState;

class ApplyPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must login to apply' })) return {};

		const application = await getApplication(ctx);
		return { application };
	};

	constructor(props) {
		super(props);
		this.state = {
			
			...props.application
		};
	}

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

export default ConnectedApply;
