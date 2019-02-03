import { AUTH_USER_SET, AUTH_TOKEN_SET } from '../actions';

export default (
	state = {
		token: '',
		user: null
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
			return {
				...state,
				token: action.token
			};
		}

		default:
			return state;
	}
};
