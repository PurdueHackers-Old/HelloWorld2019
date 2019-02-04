import { createStore, StoreCreator } from 'redux';
import reducers from '../reducers';

export default (initialState, options) => {
	const creator: StoreCreator = createStore(reducers, initialState);
	return createStore(reducers, initialState);
};
