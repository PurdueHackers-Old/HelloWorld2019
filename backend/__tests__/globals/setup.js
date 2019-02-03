const { setup } = require('./mongo');

module.exports = async function() {
	console.log('Running backend setup');
	await setup();
};
