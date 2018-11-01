import { LOGIN, LOGOUT, SET_TOKEN, SET_ORGANIZATION } from "../actions/auth-actions";
const authState = {
	loggedIn: false,
	token: "",
	organizations: [],
};

const authReducer = (state = authState, action) => {
	if (action.type === LOGIN) {
		return { ...state, loggedIn: true };
	}

	if (action.type === LOGOUT) {
		return { ...state, loggedIn: false };
	}

	if (action.type === SET_TOKEN) {
		return { ...state, token: action.token };
	}

	if (action.type === SET_ORGANIZATION) {
    const newState = {...state ,organizations:[...action.org] };
		return newState;
	}

	return state;
};

export default authReducer;
