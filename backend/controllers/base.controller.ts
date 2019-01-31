import { createLogger } from '../utils/logger';
import * as winston from 'winston';

export class BaseController {
	readonly logger: winston.Logger;
	constructor() {
		this.logger = createLogger(this);
	}
}
