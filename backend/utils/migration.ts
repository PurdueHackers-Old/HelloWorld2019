import Server from '../server';
import CONFIG from '../config';
import { User, UserDto } from '../models/user';
import { AuthController } from '../controllers/auth.controller';
import { generateUsers, generateApplications, generateApplication } from '../__tests__/helper';
import { Application } from '../models/application';
import { Status } from '../../shared/app.enums';
import { Role } from '../../shared/user.enums';
import { UserController } from '../controllers/user.controller';
import { ApplicationController } from '../controllers/application.controller';
import { GlobalsController } from '../controllers/globals.controller';

let server: Server;

const start = async () => {
	try {
		server = await Server.createInstance();
		const authController = new AuthController();
		const userController = new UserController();
		userController.globalController = new GlobalsController();

		let user = await authController.signup('test123', 'test123', {
			name: 'Test Testerson',
			email: 'test@purdue.edu'
		} as any);
		await User.findByIdAndUpdate(user.user._id, { verified: true, role: Role.ADMIN });
		let userApp = await userController.apply(
			user.user._id,
			generateApplication() as any,
			user.user
		);
		await userApp.update({ statusPublic: Status.ACCEPTED, statusInternal: Status.ACCEPTED });

		user = await authController.signup('test123', 'test123', {
			name: 'Exec User',
			email: 'exec@purdue.edu'
		} as any);
		await User.findByIdAndUpdate(user.user._id, { verified: true, role: Role.EXEC });
		userApp = await userController.apply(
			user.user._id,
			generateApplication() as any,
			user.user
		);
		await userApp.update({ statusPublic: Status.ACCEPTED, statusInternal: Status.ACCEPTED });


		
		const users = await Promise.all(
			generateUsers(8).map(u => authController.signup(u.password, u.password, u as any))
		);

		const applications = await Promise.all(
			users.map(u => userController.apply(u.user._id, generateApplication() as any, u.user))
		);

		await Promise.all(
			applications.map((app, i) => {
				let update;
				if (i < 2)
					update = { statusPublic: Status.PENDING, statusInternal: Status.PENDING };
				else if (i < 4)
					update = { statusPublic: Status.ACCEPTED, statusInternal: Status.ACCEPTED };
				else if (i < 6)
					update = { statusPublic: Status.REJECTED, statusInternal: Status.REJECTED };
				else update = { statusPublic: Status.WAITLIST, statusInternal: Status.WAITLIST };

				return Application.findByIdAndUpdate(app._id, update).exec();
			})
		);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await server.mongoose.disconnect();
	}
};

start();
