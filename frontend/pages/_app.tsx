import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import { Store } from 'redux';
import makeStore from '../redux/store';
import {
	clearFlashMessages,
	sendErrorMessage,
	sendSuccessMessage,
	refreshToken
} from '../redux/actions';
import Layout from '../modules/common/Layout';
import { initGA, logPageView } from '../utils/analytics';
import * as flash from '../utils/flash';
// import 'antd/dist/antd.less';

type Props = { store: Store };

class MyApp extends App<Props> {
	static async getInitialProps({ Component, ctx }) {
		if (ctx.req) {
			await refreshToken(ctx)(ctx.store.dispatch);
			if (!ctx.res.headersSent) {
				const messages = flash.get(ctx);
				if (messages.red) sendErrorMessage(messages.red, ctx)(ctx.store.dispatch);
				if (messages.green) sendSuccessMessage(messages.green, ctx)(ctx.store.dispatch);
			}
		}

		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
		};
	}

	componentWillMount() {
		Router.onRouteChangeStart = () => {
			const state = this.props.store.getState().flashState;
			if (state.green || state.red) clearFlashMessages()(this.props.store.dispatch);
		};
	}

	componentDidMount() {
		const state = this.props.store.getState().sessionState;
		const uid = state.user && state.user._id;
		initGA(uid);
		logPageView();
		Router.router.events.on('routeChangeComplete', logPageView);
		window.onbeforeunload = () => {
			const { flashState } = this.props.store.getState();
			if (flashState.green || flashState.red) clearFlashMessages()(this.props.store.dispatch);
		};
	}

	render() {
		const { Component, pageProps, store } = this.props as any;
		// const persistor = persistStore(store);

		return (
			<Container>
				<Provider store={store}>
					{/* <PersistGate persistor={persistor}> */}
					<Layout>
						<Component {...pageProps} />
					</Layout>
					{/* </PersistGate> */}
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);
