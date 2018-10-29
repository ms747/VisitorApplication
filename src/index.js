import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import Layout from "./layout/layout";
import AuthContext from "./context/auth-context";
import axios from "axios";

window.onunload = function(){
	localStorage.clear();
}

const state = {
	loggedIn: false,
	logout() {
		this.loggedIn = false;
	},
	login() {
		this.loggedIn = true;
	},
};

class App extends React.Component {
	static contextType = AuthContext;
	state={

	}
	async componentWillMount() {
		try {
			let data = await axios.get("http://10.10.10.1:7777/isauth", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
			if (data.status === 200) {
				this.context.login();
				this.setState({state:this.state});
				this.props.history.push("/");
			}
		} catch (e) {
			this.context.logout();
		}
	}

	render() {
		return (
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		);
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(
	<AuthContext.Provider value={state}>
		<App />
	</AuthContext.Provider>,
	rootElement
);
