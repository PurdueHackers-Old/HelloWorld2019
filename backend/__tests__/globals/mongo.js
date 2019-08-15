const MongodbMemoryServer = require('mongodb-memory-server').default;

exports.setup = async () => {
	global.mongod = new MongodbMemoryServer();
	const MONGODB_URI = await global.mongod.getConnectionString(true);
	process.env.MONGODB_URI = MONGODB_URI;
};

exports.teardown = async () => {
	await global.mongod.stop();
};
