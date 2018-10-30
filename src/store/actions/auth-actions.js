export const LOGIN = "AUTH_LOGIN";
export const LOGOUT = "AUTH_LOGOUT";

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
	}
};


