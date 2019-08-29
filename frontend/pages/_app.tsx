import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import getConfig from 'next/config';
import withRedux from 'next-redux-wrapper';
import { Store } from 'redux';
import * as Sentry from '@sentry/browser';
import makeStore from '../redux/store';
import {
	clearFlashMessages,
	sendErrorMessage,
	sendSuccessMessage,
	refreshSession
} from '../redux/actions';
import Layout from '../modules/common/Layout';
import { initGA, logPageView } from '../utils/analytics';
import * as flash from '../utils/flash';
import { IStoreState } from '../@types';
import { registerServiceWorker } from '../utils/service-worker';
import 'uikit/dist/css/uikit.min.css';
import '../assets/theme.scss';

const {
	publicRuntimeConfig: { SENTRY_KEY, NODE_ENV, SENTRY_ENVIRONMENT }
} = getConfig();

if (NODE_ENV === 'production')
	Sentry.init({
		dsn: SENTRY_KEY,
		environment: SENTRY_ENVIRONMENT,
		enabled: NODE_ENV === 'production'
	});

interface Props {
	store: Store<IStoreState>;
}

@((withRedux as any)(makeStore))
export default class MyApp extends App<Props> {
	static async getInitialProps({ Component, ctx }) {
		if (ctx.req) {
			await ctx.store.dispatch(refreshSession(ctx));
			if (!ctx.res.headersSent) {
				const messages = flash.get(ctx);
				if (messages.red) ctx.store.dispatch(sendErrorMessage(messages.red, ctx));
				if (messages.green) ctx.store.dispatch(sendSuccessMessage(messages.green, ctx));
			}
		}

		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
		};
	}

	componentDidCatch(error, errorInfo) {
		if (NODE_ENV === 'production')
			Sentry.withScope(scope => {
				Object.keys(errorInfo).forEach(key => {
					scope.setExtra(key, errorInfo[key]);
				});

				Sentry.captureException(error);
			});

		super.componentDidCatch(error, errorInfo);
	}

	componentWillMount() {
		Router.events.on('routeChangeStart', () => {
			const { store } = this.props;
			const { flashState } = store.getState();
			if (flashState.green || flashState.red) store.dispatch(clearFlashMessages() as any);
		});
		Router.events.on('routeChangeComplete', () => {
			window.scrollTo(0, 0);
		});
	}

	componentDidMount() {
		const { store } = this.props;
		const { sessionState } = store.getState();
		const uid = sessionState.user && sessionState.user._id;
		initGA(uid);
		logPageView();
		Router.router.events.on('routeChangeComplete', logPageView);
		window.onbeforeunload = () => {
			const { flashState } = store.getState();
			if (flashState.green || flashState.red) store.dispatch(clearFlashMessages() as any);
		};
		registerServiceWorker().catch(error =>
			console.error('[Service Worker]: Error registering service worker:', error)
		);
	}

	render() {
		const { Component, pageProps, store } = this.props as any;
		return (
			<Container>
				<Head>
					<title>Hello World</title>
				</Head>
				<Provider store={store}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</Container>
		);
	}
}
