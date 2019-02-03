// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
// import getConfig from 'next/config';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import rootReducer from '../reducers';
// const { publicRuntimeConfig } = getConfig();

// const enhancers = [];
// const middlewares: any[] = [thunk];

// if (publicRuntimeConfig.NODE_ENV !== 'production') {
// 	const logger = createLogger({
// 		predicate: (getState, action) => !/persist/.test(action.type)
// 	});
// 	middlewares.push(logger);
// }

// // export default createStore(
// // 	rootReducer,
// // 	composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
// // );

// // export default (initialState, options) => {
// // 	console.log('Creating redux store', initialState);
// // 	return createStore(
// // 		rootReducer,
// // 		composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
// // 	);
// // };

// const persistConfig = {
// 	key: 'root',
// 	blacklist: ['flashState'],
// 	storage
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default (initialState, options) => {
// 	console.log('Creating store:');
// 	return createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
// };

import createStoreFromServer from './server';
import createStoreFromClient from './client';

export default (initialState, props) => {
	if (props.isServer) {
		return createStoreFromServer(initialState, props);
	} else {
		return createStoreFromClient(initialState, props);
	}
};
