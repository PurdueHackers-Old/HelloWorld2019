import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Header />
				<Component {...pageProps} />
			</Container>
		);
	}
}
