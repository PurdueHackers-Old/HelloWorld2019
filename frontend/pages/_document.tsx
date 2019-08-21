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
					<style jsx global>{`
						@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
						@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
					`}</style>
					<script
						src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/js/uikit.min.js"
						defer
					></script>
					<script
						src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.7/js/uikit-icons.min.js"
						defer
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
