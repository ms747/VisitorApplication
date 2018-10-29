import React from "react";
import axios from "axios";
import Form from "../components/styled/form";
import AuthContext from "../context/auth-context";

class Login extends React.Component {
	state = {
		email: "",
		password: "",
		isError: false,
		errorMsg: "",
	};

	static contextType = AuthContext;

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	async componentWillMount() {
		try {
			let data = await axios.get("http://10.10.10.1:7777/isauth", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
			if (data.status === 200) {
				this.context.login();
				this.props.history.push("/");
			}
		} catch (e) {
			this.context.logout();
		}
	}

	handleForm = e => {
		e.preventDefault();
		axios
			.post("http://10.10.10.1:7777/login", {
				email: this.state.email,
				password: this.state.password,
			})
			.then(data => {
				localStorage.setItem("token", data.data.token);
				localStorage.setItem("id", data.data.id);
				this.context.login();
				this.props.history.push("/");
			})
			.catch(err => {
				if (err.response.status === 500) {
					const genErrors = err.response.data.error;
					this.setState({
						isError: true,
						errorMsg: genErrors,
					});
				}
			});
	};

	render() {
		return (
			<div>
				<Form method="POST" onSubmit={this.handleForm}>
					<fieldset>
						<p style={{ display: this.state.isError ? "block" : "none", color: "red" }}>{this.state.errorMsg}</p>
						<h3>Login</h3>
						<div>
							<label htmlFor="email">
								<p>Email</p>
								<input type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} />
							</label>
							<label htmlFor="password">
								<p>Password</p>
								<input type="password" name="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
							</label>
							<br />
							<button type="submit">Login</button>
						</div>
					</fieldset>
				</Form>
			</div>
		);
	}
}

export default Login;
