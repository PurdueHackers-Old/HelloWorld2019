import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<html lang="en">
				<Head>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="theme-color" content="#c09ed0" />
					<meta name="title" content="Hello World" />
					<meta name="description" content="Purdue's beginner oriented hackathon" />
					<link rel="manifest" href="/static/manifest.json" />
					<link
						rel="icon"
						type="image/png"
						href="/static/images/icons/icon-512x512.png"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Lato|Roboto&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
