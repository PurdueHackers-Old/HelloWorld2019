// import React from 'react';
// import App, { Container } from 'next/app';
// import { Provider } from 'react-redux';
// import withRedux from 'next-redux-wrapper';
// import makeStore from '../redux/store';

// class MyApp extends App {
// 	static async getInitialProps({ Component, ctx }) {
// 		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
// 		return { pageProps };
// 	}

// 	render() {
// 		const { Component, pageProps, store } = this.props as any;
// 		return (
// 			<Container>
// 				<Provider store={store}>
// 					<Header />
// 					<Component {...pageProps} />
// 				</Provider>
// 			</Container>
// 		);
// 	}
// }

// export default withRedux(makeStore)(MyApp);

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
					<PersistGate loading={null} persistor={persistor}>
						<Header />
						<Component {...pageProps} />
					</PersistGate>
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);
