import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<html lang="en">
				<Head>
					<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
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
					<link rel="apple-touch-icon" href="/static/images/icons/icon-180x180.png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />

					<script
						defer
						src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/js/uikit.min.js"
					></script>
					<script
						defer
						src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/js/uikit-icons.min.js"
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
