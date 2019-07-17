import * as pino from 'pino';
import CONFIG from '../config';
import Container from 'typedi';

export const createLogger = (context: string | object | Function) => {
	if (typeof context === 'object') context = context.constructor.name;
	if (typeof context === 'function') context = context.name;

	const prettyOptions: pino.PrettyOptions = {
		levelFirst: true,
		translateTime: true
	};
	const pinoOptions: pino.LoggerOptions = {
		prettyPrint: CONFIG.NODE_ENV === 'development' ? prettyOptions : false,
		enabled: CONFIG.NODE_ENV !== 'test',
		base: { name: context },
		timestamp: CONFIG.NODE_ENV === 'production' ? false : pino.stdTimeFunctions.epochTime
	};

	const logger = pino(pinoOptions);
	return logger;
};

export const Logger = () => {
	return (object: object | Function, propertyName: string, index?: number) => {
		const logger = createLogger(object);
		Container.registerHandler({
			object,
			propertyName,
			index,
			value: () => logger
		});
	};
};
