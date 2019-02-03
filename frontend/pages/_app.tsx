import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import makeStore from '../redux/store';
import Header from '../components/Header';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
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
