import 'jest';
import * as supertest from 'supertest';
import { generateUsers } from '../helper';
import Server from '../../server';
import { Role } from '../../../shared/user.enums';
import { IUserModel, User } from '../../models/user';

let server: Server;
let request: supertest.SuperTest<supertest.Test>;
let users: { user: IUserModel; token: string }[];
let user: { user: IUserModel; token: string };

describe('Suite: /api/admin -- Integration', () => {
	beforeEach(async () => {
		server = await Server.createInstance();
		request = supertest(server.app);
		await server.mongoose.connection.dropDatabase();

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

	afterEach(() => server.mongoose.disconnect());

	describe('Update roles', () => {
		it('Fails to update role because unauthorized', async () => {
			const {
				body: { error },
				status
			} = await request.post(`/api/admin/role`);

			expect(status).toEqual(401);
			expect(error).toEqual('You must be logged in!');
		});

		it('Fails to update role because only USER role', async () => {
			const {
				body: { error },
				status
			} = await request.post(`/api/admin/role`).auth(user.token, { type: 'bearer' });

			expect(status).toEqual(401);
			expect(error).toEqual('Insufficient permissions');
		});

		it('Fails to update role because only EXEC role', async () => {
			user.user = await User.findByIdAndUpdate(
				user.user._id,
				{ $set: { role: Role.EXEC } },
				{ new: true }
			);

			const {
				body: { error },
				status
			} = await request.post(`/api/admin/role`).auth(user.token, { type: 'bearer' });

			expect(status).toEqual(401);
			expect(error).toEqual('Insufficient permissions');
		});

		it('Fails to update role because no role', async () => {
			user.user = await User.findByIdAndUpdate(
				user.user._id,
				{ $set: { role: Role.ADMIN } },
				{ new: true }
			);

			const oldUser = users[1].user;

			const {
				body: { error },
				status
			} = await request
				.post(`/api/admin/role`)
				.send({ email: oldUser.email })
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Invalid Role');
		});

		it('Fails to update role because invalid role', async () => {
			user.user = await User.findByIdAndUpdate(
				user.user._id,
				{ $set: { role: Role.ADMIN } },
				{ new: true }
			);

			const oldUser = users[1].user;
			const role = 'invalid';

			const {
				body: { error },
				status
			} = await request
				.post(`/api/admin/role`)
				.send({ email: oldUser.email, role })
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual('Invalid Role');
		});

		it('Fails to update role non existant user', async () => {
			user.user = await User.findByIdAndUpdate(
				user.user._id,
				{ $set: { role: Role.ADMIN } },
				{ new: true }
			);

			const email = 'blah';
			const {
				body: { error },
				status
			} = await request
				.post(`/api/admin/role`)
				.send({ email, role: Role.MENTOR })
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(400);
			expect(error).toEqual(`There is no user with email: ${email}`);
		});

		it('Successfully updates a users role', async () => {
			user.user = await User.findByIdAndUpdate(
				user.user._id,
				{ $set: { role: Role.ADMIN } },
				{ new: true }
			);

			const oldUser = users[1].user;

			const {
				body: { response },
				status
			} = await request
				.post(`/api/admin/role`)
				.send({ email: oldUser.email, role: Role.MENTOR })
				.auth(user.token, { type: 'bearer' });

			expect(status).toEqual(200);
			expect(response).toBeTruthy();
			expect(response).toEqual(
				expect.objectContaining({
					...oldUser,
					updatedAt: response.updatedAt,
					role: Role.MENTOR
				})
			);
		});
	});
});
