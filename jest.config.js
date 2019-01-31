module.exports = {
	globalSetup: './test/backend/globals/setup',
	globalTeardown: './test/backend/globals/teardown',
	globals: {
		'ts-jest': {
			tsConfig: './tsconfig.server.json'
		}
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)?(x)'],
	transform: {
		'^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.tsx?$': 'ts-jest'
	}
};
