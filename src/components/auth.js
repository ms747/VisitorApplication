import React, { Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Auth extends React.Component {
	state = {
		loggedIn: false,
	};
	async componentWillMount() {
		try {
			let data = await axios.get("http://localhost:7777/isauth", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
			if (data.status === 200) {
				this.setState(
					prev => {
						return { loggedIn: !prev.loggedIn };
					},
					() => console.log(this.state)
				);
			}
		} catch (e) {
      this.props.history.push("/login");
    }
	}

	componentWillUnmount() {
		this.setState({ loggedIn: false });
	}

	render() {
		return <Fragment>{this.state.loggedIn ? { ...this.props.children } : null}</Fragment>;
	}
}

export default Auth;
