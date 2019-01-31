// const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';
const TEST_REGEX = '**/?(*.)+(spec|test).+(ts|tsx|js)?(x)';

module.exports = {
	collectCoverage: true,
	displayName: 'frontend',
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/__tests__/tsconfig.test.json'
		}
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	name: 'frontend',
	preset: 'ts-jest',
	rootDir: './',
	setupFiles: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jsdom',
	testMatch: [TEST_REGEX],
	testPathIgnorePatterns: ['./.next/']
};
