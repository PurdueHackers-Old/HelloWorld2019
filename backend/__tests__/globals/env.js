const NodeEnvironment = require('jest-environment-node');
const MongodbMemoryServer = require('mongodb-memory-server').default;

class MongoDbEnvironment extends NodeEnvironment {
	constructor(config) {
		super(config);
		if (!global.mongod) {
			global.mongod = new MongodbMemoryServer();
		}
	}

	async setup() {
		await super.setup();
		const MONGODB_URI = await global.mongod.getConnectionString(true);
		process.env.MONGODB_URI = MONGODB_URI;
	}

	async teardown() {
		await super.teardown();
	}

	runScript(script) {
		return super.runScript(script);
	}
}

module.exports = MongoDbEnvironment;
