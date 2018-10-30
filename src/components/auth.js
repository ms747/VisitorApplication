import React, { Fragment } from "react";
import axios from "axios";
import {connect} from "react-redux";
import {actions} from "../store/actions/auth-actions";

class Auth extends React.Component {
	async componentWillMount() {
		try {
			let data = await axios.get("http://10.10.10.1:7777/isauth", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
			if (data.status === 200) {
				this.props.login();
			}
		} catch (e) {
			this.props.logout();
			this.props.history.push("/login");
		}
	}

	componentWillUnmount() {
		this.props.login()
	}

	render() {
		return <Fragment>{this.props.loggedIn ? { ...this.props.children } : null}</Fragment>;
	}
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return {
		login() {
			dispatch(actions.login());
		},
		logout(){
			dispatch(actions.logout());
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
