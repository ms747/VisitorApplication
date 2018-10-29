import React from "react";
import styled from "styled-components";
import axios from "axios";
import Auth from "../components/auth";
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
		idProof: "Adhaar Card",
		idProofNumber: "",
		hasVehicle: false,
		vechicalNumber: "",
		meetType: "personal",
	};

	handleForm = e => {
		e.preventDefault();
		if (!this.state.hasVehicle) {
			this.setState({ vechicalNumber: "" });
		}
		fetch(this.state.img)
			.then(res => res.blob())
			.then(async blob => {
				const formData = new FormData();
				formData.append("img", new File([blob], "img.jpeg"));
				formData.append("name", this.state.name);
				formData.append("toMeet", this.state.toMeet);
				formData.append("idProof", this.state.idProof);
				formData.append("idProofNumber", this.state.idProofNumber);
				formData.append("hasVehicle", this.state.hasVehicle);
				formData.append("vechicalNumber", this.state.vechicalNumber);
				formData.append("meetType", this.state.meetType);
				formData.append("reason", this.state.reason);
				console.log(formData);
				const response = await axios.post("http://10.10.10.1:7777/attendee", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				console.log(response);
			});
	};

	handleChange = e => {
		if (e.target.name === "hasVehicle") {
			if (e.target.value === "true") {
				this.setState({ [e.target.name]: true });
			} else {
				this.setState({ [e.target.name]: false });
			}
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
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
			<Auth {...this.props}>
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

								<label htmlFor="meetType">
									<p>Meet Type</p>
									<select name="meetType" id="meetType" onChange={this.handleChange}>
										<option value="personal">Personal</option>
										<option value="official">Official</option>
										<option value="material">Material Related</option>
									</select>
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

								<label htmlFor="idProof">
									<p>ID Proof</p>
									<select name="idProof" id="idProof" onChange={this.handleChange}>
										<option value="Adhar Card">Adhar Card</option>
										<option value="PAN Card">PAN Card</option>
										<option value="Vechical Lisence">Vechical Lisence</option>
									</select>
								</label>

								<label htmlFor="idProofNumber">
									<p>ID Number</p>
									<input type="text" name="idProofNumber" id="idProofNumber" placeholder="Enter ID Number" value={this.state.idProofNumber} onChange={this.handleChange} />
								</label>

								<label htmlFor="hasVehicle">
									<p>Has Vehical</p>
									<select name="hasVehicle" id="hasVehicle" onChange={this.handleChange}>
										<option value={false}>No</option>
										<option value={true}>Yes</option>
									</select>
								</label>

								{this.state.hasVehicle ? (
									<label htmlFor="vechicalNumber">
										<p>Vechical Number</p>
										<input type="text" name="vechicalNumber" id="vechicalNumber" placeholder="Enter Vechical Number" value={this.state.vechicalNumber} onChange={this.handleChange} />
									</label>
								) : null}

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
			</Auth>
		);
	}
}

export default Home;
