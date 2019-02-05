import 'jest';
import * as supertest from 'supertest';
import { generateUser, generateApplication } from '../helper';
import { IUserModel } from '../../models/user';
import Server from '../../server';

let server: Server;
let request: supertest.SuperTest<supertest.Test>;
let user: { user: IUserModel; token: string };

describe('Suite: /api/applications -- Integration', () => {
	beforeAll(() =>
		Server.createInstance().then(s => {
			server = s;
			request = supertest(s.app);
		})
	);

	beforeEach(async () => {
		user = await request
			.post('/api/auth/signup')
			.send(generateUser())
			.then(response => response.body.response);
	});

	describe('Get all Applications', () => {
		it('Successfully gets all applications', async () => {
			const app = generateApplication();
			// console.log('App:', app);
		});
	});

	afterEach(() => server.mongoose.connection.dropDatabase());

	afterAll(() => server.mongoose.disconnect());
});
