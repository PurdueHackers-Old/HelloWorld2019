import 'reflect-metadata';
import * as express from 'express';
import { Server as HTTPServer, createServer as createHttpServer } from 'http';
import { Server as HTTPSServer, createServer as createHttpsServer } from 'https';
import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as yes from 'yes-https';
import * as next from 'next';
import { join } from 'path';
import { readFileSync } from 'fs';
import { useExpressServer, useContainer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getFromContainer, MetadataStorage } from 'class-validator';
import * as swaggerUI from 'swagger-ui-express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import CONFIG from './config';
import { globalError } from './middleware/globalError';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { currentUserChecker, authorizationChecker } from './middleware/authentication';
import { createLogger } from './utils/logger';
import { ValidationMiddleware } from './middleware/validation';
import { multer } from './utils';
import { OpenAPIObject } from 'openapi3-ts';
import { readFile } from 'fs';

const { NODE_ENV, DB } = CONFIG;
const routingControllerOptions = {
	cors: true,
	defaultErrorHandler: false,
	validation: true,
	controllers: [__dirname + '/controllers/*'],
	interceptors: [SuccessInterceptor],
	currentUserChecker,
	authorizationChecker,
	middlewares: [ValidationMiddleware]
};

export default class Server {
	public static async createInstance() {
		const server = new Server();
		await server.setupMongo();
		return server;
	}

	public app: express.Application;
	public httpServer: HTTPServer | HTTPSServer;
	public nextApp: next.Server;
	public mongoose: typeof mongoose;
	public logger: Logger;
	public spec: OpenAPIObject;

	private constructor() {
		this.app = express();
		this.logger = createLogger(this);
		this.setup();
		this.nextApp = next({
			dev: NODE_ENV === 'development',
			dir: join(__dirname, '/../frontend')
		});
	}

	public async initFrontend() {
		try {
			await this.nextApp.prepare();
			const handle = this.nextApp.getRequestHandler();
			if (CONFIG.NODE_ENV === 'production') {
				this.app.use(
					'/service-worker.js',
					express.static('frontend/.next/service-worker.js')
				);
			} else {
				this.app.use('/service-worker.js', express.static('frontend/service-worker.js'));
			}
			this.app.use('/manifest.json', express.static('frontend/static/manifest.json'));
			this.app.get('*', (req, res) => {
				return handle(req, res);
			});
		} catch (error) {
			this.logger.error('Error setting up frontend:', error);
			throw error;
		}
	}

	private setup(): void {
		this.setupMiddleware();
		// Enable controllers in this.app
		useContainer(Container);
		this.app = useExpressServer(this.app, routingControllerOptions);
		// Any unhandled errors will be caught in this middleware
		this.app.use(globalError);
		this.setupSwagger();
		if (CONFIG.NODE_ENV === 'development') {
			const cert = readFileSync(join(process.cwd(), '/certs/localhost+2.pem'));
			const key = readFileSync(join(process.cwd(), '/certs/localhost+2-key.pem'));
			this.httpServer = createHttpsServer(
				{
					key,
					cert,
					requestCert: false,
					rejectUnauthorized: false
				},
				this.app
			);
		} else {
			this.httpServer = createHttpServer(this.app);
		}
	}

	private setupMiddleware() {
		this.app.use(helmet());
		this.app.use(yes());
		if (NODE_ENV !== 'test') {
			const logFormat = NODE_ENV !== 'production' ? 'dev' : 'tiny';
			this.app.use(logger(logFormat, { skip: r => r.url.startsWith('/_next') }));
		}
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(cors());
		this.app.use(multer.any());
	}

	private async setupMongo() {
		try {
			this.mongoose = await mongoose.connect(DB, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false
			});
			this.mongoose.Promise = Promise;
			this.logger.info('Connected to mongo:', DB);
			return this.mongoose;
		} catch (error) {
			this.logger.error('Error connecting to mongo:', error);
			throw error;
		}
	}

	private setupSwagger() {
		const storage = getMetadataArgsStorage();
		const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
		const schemas = validationMetadatasToSchemas(metadatas, {
			refPointerPrefix: '#/components/schemas'
		});

		this.spec = routingControllersToSpec(storage, routingControllerOptions, {
			components: { schemas },
			info: { title: 'Hello World', version: '0.0.1' },
			security: [
				{
					bearerAuth: []
				}
			]
		});
		this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(this.spec));
	}

	public async start() {
		await this.initFrontend();

		this.httpServer.listen(CONFIG.PORT, () => {
			this.logger.info('CONFIG:', CONFIG);
			this.logger.info(`Listening on port: ${CONFIG.PORT}`);
		});

		// Graceful shutdown
		process.on('SIGTERM', async () => {
			await this.mongoose.disconnect();
			await new Promise((resolve, reject) =>
				this.httpServer.close(err => (err ? reject(err) : resolve()))
			);
			process.exit(0);
		});

		return this;
	}

	public async stop() {
		if (this.mongoose) {
			await Promise.all(
				this.mongoose.modelNames().map(model => this.mongoose.model(model).ensureIndexes())
			);
			await this.mongoose.disconnect();
		}
		if (this.httpServer) {
			await new Promise((resolve, reject) =>
				this.httpServer.close(err => (err ? reject(err) : resolve()))
			);
		}
		return this;
	}
}
