const MongodbMemoryServer = require('mongodb-memory-server').default;

let mongod;

exports.setup = async () => {
	mongod = new MongodbMemoryServer();
	const DB = await mongod.getConnectionString();
	process.env.DB = DB;
};

exports.teardown = async () => {
	await mongod.stop();
};
