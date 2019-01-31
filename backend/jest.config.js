module.exports = {
	collectCoverage: true,
	displayName: 'backend',
	globalSetup: '<rootDir>/__tests__/globals/setup',
	globalTeardown: '<rootDir>/__tests__/globals/teardown',
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/../tsconfig.server.json'
		}
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	name: 'backend',
	preset: 'ts-jest',
	rootDir: './',
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)?(x)']
	// transform: {
	// 	'^.+\\.tsx?$': 'ts-jest'
	// }
};
