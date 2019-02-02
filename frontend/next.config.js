// require('dotenv').config();
const withTypescript = require('next-with-typescript');
const { publicRuntimeConfig, serverRuntimeConfig } = require('../env-config');

// const env = process.env;

// const serverRuntimeConfig = {
// 	DB: env.DB || 'mongodb://localhost:27017/HelloWorld',
// 	PORT: env.PORT || 5000,
// 	REDIS_URL: env.REDIS_URL || 'redis://localhost:6379',
// 	SECRET: env.SECRET || 'my-secret',
// 	EXPIRES_IN: env.EXPIRES_IN || '7 days',
// 	NODE_ENV: env.NODE_ENV || 'development',
// 	ORG_NAME: env.ORG_NAME || 'Purdue Hackers',
// 	EMAIL: env.EMAIL || 'my@email.com',
// 	GC_BUCKET: env.GC_BUCKET || 'mybucket',
// 	GC_PROJECT_ID: env.GC_PROJECT_ID || 'myprojectid',
// 	GC_PRIVATE_KEY: env.GC_PRIVATE_KEY || 'myprivatekey',
// 	GC_CLIENT_EMAIL: env.GC_CLIENT_EMAIL || 'my@clientemail.com',
// 	SENDGRID_KEY: env.SENDGRID_KEY || 'mysendgridkey'
// };

// const publicRuntimeConfig = {
// 	API_URL: process.env.API_URL
// 		? process.env.API_URL
// 		: `http://localhost:${serverRuntimeConfig.PORT}/api`
// };

module.exports = {
	publicRuntimeConfig,
	serverRuntimeConfig,
	...withTypescript()
};
