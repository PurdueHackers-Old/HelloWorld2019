import 'jest';
import * as supertest from 'supertest';
import { generateUser, generateApplication, generateApplications, generateUsers } from '../helper';
import { IUserModel } from '../../models/user';
import Server from '../../server';
import { IApplicationModel } from '../../models/application';

let server: Server;
let request: supertest.SuperTest<supertest.Test>;
let users: { user: IUserModel; token: string }[];
let user: { user: IUserModel; token: string };
let applications: IApplicationModel[];

describe('Suite: /api/applications -- Integration', () => {
	beforeAll(() =>
		Server.createInstance().then(s => {
			server = s;
			request = supertest(s.app);
		})
	);

	beforeEach(async () => {
		users = await Promise.all<{ user: IUserModel; token: string }>(
			generateUsers(6).map(u =>
				request
					.post('/api/auth/signup')
					.send(u)
					.then(response => response.body.response)
			)
		);

		applications = await Promise.all<IApplicationModel>(
			users.map(u =>
				request
					.post(`/api/users/${u.user._id}/apply`)
					.send(generateApplication())
					.auth(u.token, { type: 'bearer' })
					.then(response => response.body.response)
			)
		);

		user = users[0];
	});

	describe('Get all Applications', () => {
		it('Successfully gets all applications', async () => {
			const {
				body: { response },
				status
			} = await request.get('/api/applications');
			expect(response.applications).toHaveLength(applications.length);
			expect(response.applications).toEqual(
				expect.arrayContaining(
					applications.map(app =>
						expect.objectContaining({
							gender: app.gender,
							ethnicity: app.ethnicity,
							classYear: app.classYear,
							graduationYear: app.graduationYear,
							major: app.major,
							referral: app.referral,
							hackathons: app.hackathons,
							shirtSize: app.shirtSize,
							dietaryRestrictions: app.dietaryRestrictions,
							website: app.website,
							answer1: app.answer1,
							answer2: app.answer2
						})
					)
				)
			);
		});
	});

	afterEach(() => server.mongoose.connection.dropDatabase());

	afterAll(() => server.mongoose.disconnect());
});
