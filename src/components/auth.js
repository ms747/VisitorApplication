import React, { Fragment } from "react";
import axios from "axios";
import authContext from "../context/auth-context";

class Auth extends React.Component {

	static contextType = authContext;


	async componentWillMount() {
		try {
			let data = await axios.get("http://10.10.10.1:7777/isauth", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
			if (data.status === 200) {
				this.context.login();
			}
		} catch (e) {
			this.context.logout();
			this.props.history.push("/login");
		}
	}

	componentWillUnmount() {
		this.context.login()
	}

	render() {
		return <Fragment>{this.context.loggedIn ? { ...this.props.children } : null}</Fragment>;
	}
}

export default Auth;
