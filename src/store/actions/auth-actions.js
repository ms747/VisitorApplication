export const LOGIN = "AUTH_LOGIN";
export const LOGOUT = "AUTH_LOGOUT";
export const SET_TOKEN = "AUTH_SET_TOKEN";
export const SET_ORGANIZATION = "SET_ORGANIZATION";

export const actions = {
	login() {
		return {
			type: LOGIN,
		};
	},
	logout() {
		return {
			type: LOGOUT,
		};
	},
	setToken(token) {
		return {
			type: SET_TOKEN,
			token,
		};
	},
	addOrg(org){
		return {
			type: SET_ORGANIZATION,
			org
		}
	}
};
