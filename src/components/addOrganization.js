import React from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { actions } from "../store/actions/auth-actions";

const Overlay = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	display: ${props => (props.show ? "flex" : "none")};
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index:9999;

	& > div {
		background:white;
		border:1px solid #ced4da;
		padding:1rem 3rem;
	}
`;

class AddOrganization extends React.Component {
	state = {
		organization: "",
		error: false,
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};



	handleForm = e => {
		e.preventDefault();
		const x = this.props.organizations;
		axios.post("http://10.10.10.1:7777/organization", { organization: this.state.organization }, { withCredentials: true }).then((data) => {
			this.setState({ organization: "" });
			x.unshift(data.data);
			this.props.addOrg(x);
			this.props.selectref.current.selectedIndex = 0;
			this.props.hideOverlay();
		})
	};

	render() {
		return (
			<Overlay {...this.props}>
				<div>

					<form onSubmit={this.handleForm}>
						{this.state.error ? <div className="form-group"><p>Error while processing</p></div> : null}
						<div className="form-group">
							<label htmlFor="Organization">
								<p>Organization</p>
								<input className="form-control" type="text" name="organization" id="organization" onChange={this.handleChange} value={this.state.organization} />
							</label>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col">
									<button className="btn btn-primary" type="submit">Add</button>
								</div>
								<div className="col">
									<button type="button" className="btn btn-danger" onClick={this.props.hideOverlay}>Close</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Overlay>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		addOrg(org) {
			dispatch(actions.addOrg(org));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);
