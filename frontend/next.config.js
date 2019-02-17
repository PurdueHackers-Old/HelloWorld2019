const withTypescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-plugin-transpile-modules');
const { publicRuntimeConfig, serverRuntimeConfig } = require('../backend/config/env-config');

module.exports = withPlugins(
	[
		withTM({
			transpileModules: ['shared']
		}),
		withTypescript
	],
	{
		publicRuntimeConfig,
		serverRuntimeConfig,
		webpack(config, options) {
			if (options.isServer && options.dev) {
				const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

				config.plugins.push(
					new ForkTsCheckerWebpackPlugin({
						tsconfig: '../tsconfig.server.json',
						tslint: '../tslint.json'
					})
				);
			}

			return config;
		}
	}
);
