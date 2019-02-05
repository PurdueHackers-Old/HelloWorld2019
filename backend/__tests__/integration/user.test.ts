import 'jest';
import * as supertest from 'supertest';
import { generateUsers, generateApplication, generateUser } from '../helper';
import { IUserModel, User, Role } from '../../models/user';
import Server from '../../server';
import { Status } from '../../models/app.enums';
import { ObjectId } from 'bson';

let server: Server;
let request: supertest.SuperTest<supertest.Test>;
let users: { user: IUserModel; token: string }[];
let user: { user: IUserModel; token: string };

describe('Suite: /api/users -- Integration', () => {
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
		user = users[0];
	});

	describe('Get all Users', () => {
		it('Successfully gets all users', async () => {
			const {
				body: { response },
				status
			} = await request.get('/api/users');
			expect(status).toEqual(200);
			expect(response.users).toHaveLength(users.length);
			response.users.forEach(u => {
				expect(u).not.toHaveProperty('password');
				expect(u).toHaveProperty('_id');
				const foundUser = users.find(val => val.user._id === u._id);
				expect(foundUser).toBeTruthy();
				expect(u.name).toEqual(foundUser.user.name);
				expect(u.email).toEqual(foundUser.user.email);
			});
		});
	});

	describe('Get a single user', () => {
		it('Fails to get a single user because invalid id', async () => {
			const {
				body: { error },
				status
			} = await request.get('/api/users/invalidID');
			expect(status).toEqual(400);
			expect(error).toEqual('Invalid user ID');
		});

		it('Fails to get a single user because user does not exist', async () => {
			const {
				body: { error },
				status
			} = await request.get(`/api/users/${server.mongoose.Types.ObjectId()}`);
			expect(status).toEqual(400);
			expect(error).toEqual('User does not exist');
		});

		it('Successfully gets a single user', async () => {
			const {
				body: { response },
				status
			} = await request.get(`/api/users/${user.user._id}`);
			expect(status).toEqual(200);
			expect(response).toEqual(user.user);
		});
	});

	describe('New Application tests', () => {
		it('Fails to create an application because invalid gender', async () => {
			const app = generateApplication();
			app.gender = 'Invalid';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid gender');
		});

		it('Fails to create an application because invalid ethnicity', async () => {
			const app = generateApplication();
			app.ethnicity = 'Invalid';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid ethnicity');
		});

		it('Fails to create an application because invalid class year', async () => {
			const app = generateApplication();
			app.classYear = 'Invalid';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid class year');
		});

		it('Fails to create an application because invalid graduation year', async () => {
			const app = generateApplication();
			app.graduationYear = 0;
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid graduation year');
		});

		it('Fails to create an application because graduation year is a string', async () => {
			const app = generateApplication();
			(app as any).graduationYear = 'invalid';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Graduation year must be a number');
		});

		it('Fails to create an application because hackathons is not a number', async () => {
			const app = generateApplication();
			(app as any).hackathons = 'invalid';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid hackathon number');
		});

		it('Fails to create an application because there is no hackathons', async () => {
			const app = generateApplication();
			delete app.hackathons;
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid hackathon number');
		});

		it('Fails to create an application because invalid website URL', async () => {
			const app = generateApplication();
			app.website = 'invalid';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide a valid website URL');
		});

		it('Fails to create an application because answer1 is too short', async () => {
			const app = generateApplication();
			app.answer1 = '';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Please provide an answer');
		});

		it('Fails to create an application because answer1 is too short', async () => {
			const app = generateApplication();
			app.answer1 = '1234567890'.repeat(50);
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Your answer must be less than 250 characters');
		});

		it('Fails to create an application because invalid user ID', async () => {
			const app = generateApplication();
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/InvalidID/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Invalid user ID');
		});

		it('Fails to create an application because user does not exist', async () => {
			const app = generateApplication();
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${new ObjectId()}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('User not found');
		});

		it('Fails to create an application because user not logged in', async () => {
			const app = generateApplication();
			const {
				body: { error },
				status
			} = await request.post(`/api/users/${user.user._id}/apply`).send(app);

			expect(status).toEqual(401);
			expect(error).toEqual('You must be logged in!');
		});

		it('Fails to create an application because users do not match', async () => {
			const app = generateApplication();
			const {
				body: { error },
				status
			} = await request
				.post(`/api/users/${users[0].user._id}/apply`)
				.send(app)
				.auth(users[1].token, { type: 'bearer' });

			expect(status).toEqual(401);
			expect(error).toEqual('You are unauthorized to edit this application');
		});

		it('Successfully creates an application for a user', async () => {
			const app = generateApplication();
			const {
				body: { response },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(200);
			expect(response).toHaveProperty('_id');
			expect(response.statusInternal).toEqual(Status.PENDING);
			expect(response.statusPublic).toEqual(Status.PENDING);
			expect(response.emailSent).toEqual(false);
			expect(response).toEqual(
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
			);
		});

		it('Successfully creates an application for another user by an admin', async () => {
			const admin = await request
				.post('/api/auth/signup')
				.send(generateUser())
				.then(resp => resp.body.response);

			admin.user = await User.findByIdAndUpdate(
				admin.user._id,
				{ role: Role.ADMIN },
				{ new: true }
			).exec();

			const app = generateApplication();
			const {
				body: { response },
				status
			} = await request
				.post(`/api/users/${user.user._id}/apply`)
				.send(app)
				.auth(admin.token, { type: 'bearer' });

			expect(status).toEqual(200);
			expect(response).toHaveProperty('_id');
			expect(response.statusInternal).toEqual(Status.PENDING);
			expect(response.statusPublic).toEqual(Status.PENDING);
			expect(response.emailSent).toEqual(false);
			expect(response).toEqual(
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
			);
		});
	});

	afterEach(() => server.mongoose.connection.dropDatabase());

	afterAll(() => server.mongoose.disconnect());
});
