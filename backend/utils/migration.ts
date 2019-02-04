import Server from '../server';
import CONFIG from '../config';
import { User, UserDto } from '../models/user';
import { AuthController } from '../controllers/auth.controller';

let server: Server;

const start = async () => {
	try {
		server = await Server.createInstance();
		const user = new User({
			name: 'Test Testerson',
			email: 'test@purdue.edu',
			password: 'test123',
			verified: true
		});
		await user.save();
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await server.mongoose.disconnect();
	}
};

start();
