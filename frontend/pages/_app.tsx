import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Header from '../components/Header';
import makeStore from '../redux/store';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props as any;
		return (
			<Container>
				<Provider store={store}>
					<Header />
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);

// export default class MyApp extends App {
// 	render() {
// 		const { Component, pageProps } = this.props;
// 		return (
// 			<Container>
// 				<Header />
// 				<Component {...pageProps} />
// 			</Container>
// 		);
// 	}
// }
