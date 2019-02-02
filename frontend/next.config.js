// const withTypescript = require('next-with-typescript')
// module.exports = withTypescript()

const withTypescript = require('next-with-typescript');
// const { publicRuntimeConfig, serverRuntimeConfig } = require('../env-config');
const { publicRuntimeConfig, serverRuntimeConfig } = require('../backend/config/env-config');

module.exports = {
	publicRuntimeConfig,
	serverRuntimeConfig,
	...withTypescript()
};
