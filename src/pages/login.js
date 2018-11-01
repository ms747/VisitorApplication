import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actions } from "../store/actions/auth-actions";

class Login extends React.Component {
	state = {
		email: "",
		password: "",
		isError: false,
		errorMsg: "",
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	async componentDidMount() {
		try {
			let data = await axios.get("http://10.10.10.1:7777/isauth", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
			if (data.status === 200) {
				this.props.login();
				this.props.history.push("/");
			}
		} catch (e) {
			this.props.logout();
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
				localStorage.setItem("name", data.data.name);
				this.props.setToken(data.data.token);
				this.props.login();
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
			<form method="POST" onSubmit={this.handleForm}>
				<fieldset>
					
					<h3 style={{ margin: "1rem 0" }}>Login</h3>
					<div className="alert alert-dismissible alert-danger" style={{ display: this.state.isError ? "block" : "none" }}>
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						<strong>{this.state.errorMsg}</strong>
					</div>
					<div>
						<div className="form-group">
							<label htmlFor="email">
								<p>Email</p>
								<input className="form-control" type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} />
							</label>
						</div>

						<div className="form-group">
							<label htmlFor="password">
								<p>Password</p>
								<input className="form-control" type="password" name="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func,
	logout: PropTypes.func,
	setToken: PropTypes.func,
	history: PropTypes.object,
};

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
		setToken(token) {
			dispatch(actions.setToken(token));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
