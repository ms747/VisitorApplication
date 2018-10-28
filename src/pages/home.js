import React from "react";
import styled from "styled-components";
import axios from "axios";
import WebcamOverlay from "../components/WebcamOverlay";

const Form = styled.form`
	fieldset > div {
		display: flex;
		flex-direction: column;
	}

	fieldset > div > label {
		align-self: flex-start;
	}
`;

class Home extends React.Component {
	state = {
		name: "Mayur Shah",
		img: "",
		toMeet: "Ganesh Shah",
		reason: "Application Demo",
		overlay: false,
	};

	handleForm = e => {
		e.preventDefault();
		fetch(this.state.img)
			.then(res => res.blob())
			.then(async blob => {
				const formData = new FormData();
				formData.append("img", new File([blob], "img.jpeg"));
				formData.append("name", this.state.name);
				formData.append("toMeet", this.state.toMeet);
				formData.append("reason", this.state.reason);
				const response = await axios.post("http://localhost:7777/attendee", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				console.log(response);
			});
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	showOverlay = e => {
		this.setState({ overlay: true });
	};

	hideOverlay = e => {
		this.setState({ overlay: false });
	};

	setSrc = src => {
		this.setState({ img: src });
	};

	render() {
		return (
			<div>
				<WebcamOverlay show={this.state.overlay} hideOverlay={this.hideOverlay} setSrc={this.setSrc} />
				<h1>Home</h1>
				<Form onSubmit={this.handleForm} encType="multipart/form-data">
					<fieldset>
						<div>
							<label htmlFor="name">
								<p>Name</p>
								<input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
							</label>
							<label htmlFor="picture">
								<p>Picture</p>
								<button type="button" onClick={this.showOverlay}>
									Take Picture
								</button>
								<br />
								{this.state.img ? <img src={this.state.img} alt="" name="picture" id="picture" /> : null}
							</label>

							<label htmlFor="toMeet">
								<p>To Meet</p>
								<input type="text" name="toMeet" id="toMeet" placeholder="To Meet" value={this.state.toMeet} onChange={this.handleChange} />
							</label>
							<label htmlFor="reason">
								<p>Reason</p>
								<textarea type="text" name="reason" id="reason" placeholder="Reason" value={this.state.reason} onChange={this.handleChange} />
							</label>
							<br />
							<input type="submit" value="Add" />
						</div>
					</fieldset>
				</Form>
			</div>
		);
	}
}

export default Home;
