import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import getConfig from 'next/config';
import rootReducer from '../reducers';
const { publicRuntimeConfig } = getConfig();

const enhancers = [];
const middleware = [thunk];

if (publicRuntimeConfig.NODE_ENV !== 'production') middleware.push(logger);

// export default createStore(
// 	rootReducer,
// 	composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
// );

export default (initialState, options) => {
	console.log('Creating redux store', initialState);
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
	);
};
