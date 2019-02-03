import { AUTH_USER_SET, AUTH_TOKEN_SET, AUTH_REMEMBER_ME_SET } from '../actions';
import { getStorage, setStorage } from '../../utils/storage';

export default (
	state = {
		// token: getStorage().getItem('token') || '',
		// user: JSON.parse(getStorage().getItem('user')) || null,
		token: '',
		user: null,
		rememberMe: false
	},
	action
) => {
	switch (action.type) {
		case AUTH_USER_SET: {
			return action.user
				? {
						...state,
						user: {
							...state.user,
							...action.user
						}
				  }
				: {
						...state,
						user: null
				  };
		}
		case AUTH_TOKEN_SET: {
			// action.token
			// 	? getStorage().setItem('token', action.token)
			// 	: getStorage().removeItem('token');
			return {
				...state,
				token: action.token
			};
		}
		case AUTH_REMEMBER_ME_SET: {
			// const token = getStorage().getItem('token');
			// getStorage().removeItem('token');
			// action.rememberMe ? setStorage(localStorage) : setStorage(sessionStorage);
			// if (token) getStorage().setItem('token', token);
			return {
				...state,
				rememberMe: action.rememberMe
			};
		}

		default:
			return state;
	}
};
