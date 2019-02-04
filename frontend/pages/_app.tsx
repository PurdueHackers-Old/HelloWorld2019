import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Store } from 'redux';
import makeStore from '../redux/store';
import Header from '../components/Header';
import { clearFlashMessages } from '../redux/actions';

type Props = { store: Store };

class MyApp extends App<Props> {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
		};
	}

	componentWillMount() {
		Router.onRouteChangeComplete = url => {
			const state = this.props.store.getState().flashState;
			if (state.msgGreen || state.msgRed) clearFlashMessages()(this.props.store.dispatch);
		};
	}

	render() {
		const { Component, pageProps, store } = this.props as any;
		const persistor = persistStore(store);

		return (
			<Container>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<Header />
						<Component {...pageProps} />
					</PersistGate>
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);
