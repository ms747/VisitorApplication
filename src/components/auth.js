import React, { Fragment } from "react";
import { connect } from "react-redux";
import { actions } from "../store/actions/auth-actions";

class Auth extends React.Component {
	componentWillMount() {
		if (localStorage.getItem("token") === this.props.token) {
			this.props.login();
		} else {
			this.props.logout();
			this.props.history.push("/login");
		}
	}

	render() {
		return <Fragment>{this.props.loggedIn ? { ...this.props.children } : null}</Fragment>;
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		login() {
			dispatch(actions.login());
		},
		logout() {
			dispatch(actions.logout());
		},
		settoken(token) {
			dispatch(actions.setToken(token));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
