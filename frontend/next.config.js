const withTypescript = require('@zeit/next-typescript');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const optimizedImages = require('next-optimized-images');
const withOffline = require('next-offline');
const defaultGetLocalIdent = require('css-loader/lib/getLocalIdent');
const { basename } = require('path');
const { publicRuntimeConfig, serverRuntimeConfig } = require('../backend/config/env-config');

// fix: prevents error when .css/.less files are required by node
if (typeof require !== 'undefined') {
	// tslint:disable: no-empty
	require.extensions['.less'] = () => {};
	require.extensions['.css'] = () => {};
}

module.exports = withPlugins(
	[
		[
			withTM,
			{
				transpileModules: ['shared']
			}
		],
		[withTypescript],
		[withCss],
		[
			withSass,
			{
				// cssModules: true,
				cssLoaderOptions: {
					// localIdentName: "[name]__[local]",
					getLocalIdent: (loaderContext, localIdentName, localName, options) => {
						const fileName = basename(loaderContext.resourcePath);
						if (fileName.indexOf('theme.scss') !== -1) {
							return localName;
						} else {
							return defaultGetLocalIdent(
								loaderContext,
								localIdentName,
								localName,
								options
							);
						}
					}
				},
				sassLoaderOptions: {
					includePaths: ['node_modules', '../node_modules']
				}
			}
		],
		[optimizedImages],
		[
			withOffline,
			{
				scope: '/',
				dontAutoRegisterSw: true,
				generateSw: false,
				devSwSrc: './service-worker.js',
				workboxOpts: {
					swSrc: './service-worker.js',
					swDest: './service-worker.js'
				}
			}
		],
		[
			withBundleAnalyzer({
				enabled: publicRuntimeConfig.ANALYZE
			})
		]
	],
	{
		publicRuntimeConfig,
		serverRuntimeConfig,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		webpack: (config, options) => {
			// const { dev, isServer } = options;
			// if (isServer && dev) {
			// 	const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

			// 	config.plugins.push(
			// 		new ForkTsCheckerWebpackPlugin({
			// 			tsconfig: '../tsconfig.server.json',
			// 			tslint: '../tslint.json'
			// 		})
			// 	);
			// }
			// config.plugins.push(
			// 	new webpack.DefinePlugin({
			// 		'process.env.NODE_ENV': process.env.NODE_ENV
			// 	})
			// );

			return config;
		}
	}
);
