const { setup } = require('./mongo');

module.exports = async config => {
	await setup();
};
