const { setup } = require('./mongo');

module.exports = async function() {
	await setup();
};
