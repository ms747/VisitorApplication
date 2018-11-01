import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Auth from "../components/auth";
import WebcamOverlay from "../components/WebcamOverlay";
import AddOrganizationOverlay from "../components/addOrganization";
import { actions } from "../store/actions/auth-actions";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.selectRef = React.createRef();
	}
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
		organizationsOverlay: false,
	};

	async getOrganizationNames() {
		try {
			let data = await axios.get("http://10.10.10.1:7777/organization", { withCredentials: true });
			data = await data.data;
			this.props.addOrg(data);
		} catch (e) {
			console.log(e);
		}
	}

	componentDidMount() {
		this.getOrganizationNames();
	}

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
				formData.append("entryBy", localStorage.getItem("name"));
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

	showOverlay = () => {
		this.setState({ overlay: true });
	};

	hideOverlay = () => {
		this.setState({ overlay: false });
	};

	setSrc = src => {
		this.setState({ img: src });
	};

	addOrganization = () => {
		this.setState({ organizationsOverlay: true });
	};

	hideAddOrganization = () => {
		this.setState({ organizationsOverlay: false });
	};

	reRender = () => {
		this.setState({ state: this.state });
	};
	render() {
		return (
			<Auth {...this.props}>
				<div>
					<WebcamOverlay show={this.state.overlay} hideOverlay={this.hideOverlay} setSrc={this.setSrc} />
					<AddOrganizationOverlay show={this.state.organizationsOverlay} hideOverlay={this.hideAddOrganization} selectref={this.selectRef} />
					<h1 style={{ margin: "1rem 0" }}>Guest Entry</h1>
					<form onSubmit={this.handleForm} encType="multipart/form-data">
						<fieldset>
							<div className="row">
								<div className="col-sm-12 col-xl-6 col-lg-6 col-md-6">
									<div className="form-group">
										<label htmlFor="name">
											<p>Name</p>
											<input className="form-control" type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
										</label>
									</div>

									<div className="form-group">
										<label htmlFor="meetType">
											<p>Meet Type</p>
											<select className="custom-select" name="meetType" id="meetType" onChange={this.handleChange}>
												<option value="Personal">Personal</option>
												<option value="Official">Official</option>
												<option value="Material">Material Related</option>
											</select>
										</label>
									</div>

									<div className="form-group">
										<label htmlFor="toMeet">
											<p>To Meet</p>
											<input className="form-control" type="text" name="toMeet" id="toMeet" placeholder="To Meet" value={this.state.toMeet} onChange={this.handleChange} />
										</label>
									</div>

									<div className="form-group">
										<label htmlFor="idProofNumber">
											<p>ID Number</p>
											<input type="text" className="form-control" name="idProofNumber" id="idProofNumber" placeholder="Enter ID Number" value={this.state.idProofNumber} onChange={this.handleChange} />
										</label>
									</div>

									<div className="form-group">
										<label htmlFor="reason">
											<p>Purpose</p>
											<textarea className="form-control" type="text" name="reason" id="reason" placeholder="Reason" value={this.state.reason} onChange={this.handleChange} />
										</label>
									</div>


								</div>

								<div className="col-sm-12 col-xl-6 col-xl-6 col-lg-6 col-md-6">
									<div className="form-group">
										<label htmlFor="organization">
											<p>Organization</p>
											<select className="custom-select" name="organizations" id="organizations" ref={this.selectRef}>
												{this.props.organizations &&
													this.props.organizations.map(org => {
														return (
															<option key={org.id} value="">
																{org.name}
															</option>
														);
													})}
											</select>
										</label>
										<button type="button" className="btn btn-primary" onClick={this.addOrganization}>+</button>
									</div>

									<div className="form-group">
										<label htmlFor="picture">
											<p>Picture</p>
											<button type="button" className="btn btn-primary" onClick={this.showOverlay}>
												Take Picture
										</button>
											<br />
											{this.state.img ? <img style={{ margin: "1rem 0" }} src={this.state.img} alt="" name="picture" id="picture" /> : null}
										</label>
									</div>

									<div className="form-group">
										<label htmlFor="idProof">
											<p>ID Proof</p>
											<select className="custom-select" name="idProof" id="idProof" onChange={this.handleChange}>
												<option value="N.A">N.A</option>
												<option value="Adhar Card">Adhar Card</option>
												<option value="PAN Card">PAN Card</option>
												<option value="Vechical Lisence">Vechical Lisence</option>
												<option value="Others">Others</option>
											</select>
										</label>
									</div>

									<div className="form-group">
										<label htmlFor="hasVehicle">
											<p>Has Vehical</p>
											<select className="custom-select" name="hasVehicle" id="hasVehicle" onChange={this.handleChange}>
												<option value={false}>No</option>
												<option value={true}>Yes</option>
											</select>
										</label>
									</div>

									<div className="form-group">
										{this.state.hasVehicle ? (
											<label htmlFor="vechicalNumber">
												<p>Vechical Number</p>
												<input className="form-control" type="text" name="vechicalNumber" id="vechicalNumber" placeholder="Enter Vechical Number" value={this.state.vechicalNumber} onChange={this.handleChange} />
											</label>
										) : null}
									</div>


								</div>
							</div>
							<div className="row">
								<button type="submit" className="btn btn-primary btn-block">Add</button>
							</div>
						</fieldset>
					</form>
				</div>
			</Auth>
		);
	}
}

Home.propTypes = {
	organizations: PropTypes.array,
};

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		addOrg(org) {
			dispatch(actions.addOrg(org));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
