import React from "react";
import axios from "axios";
import Form from "../components/styled/form";

class Signup extends React.Component {
	state = {
		email: "",
		password: "",
		name: "",
		isError: false,
		errorMsg: "",
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleForm = async e => {
		e.preventDefault();
		axios
			.post("http://localhost:7777/signup", {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			})
			.then(data => {
				if(data.status === 201){
					this.setState({
						isError:false,
						errorMsg:""
					})
					this.props.history.push("/login");
				}
			})
			.catch(err => {
				if(err.response.status === 500){
					let genErrors = ""
					for(let i = 0 ; i < err.response.data.errors.length ; i++){
						genErrors += err.response.data.errors[i].msg + " "
					}
					this.setState({
						isError:true,
						errorMsg: genErrors
					})
				}
			});
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.handleForm}>
					<fieldset>
						<p style={{ display: this.state.isError ? "block" : "none", color: "red" }}>{this.state.errorMsg}</p>
						<h3>Sign Up</h3>
						<div>
							<label htmlFor="name">
								<p>Name</p>
								<input type="text" name="name" id="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} />
							</label>
							<label htmlFor="email">
								<p>Email</p>
								<input type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} />
							</label>
							<label htmlFor="password">
								<p>Password</p>
								<input type="password" name="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
							</label>
							<br />
							<button type="submit">Signup</button>
						</div>
					</fieldset>
				</Form>
			</div>
		);
	}
}

export default Signup;
