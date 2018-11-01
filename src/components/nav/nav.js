import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actions } from "../../store/actions/auth-actions";

const Nav = props => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<Link className="navbar-brand" to="/">
				Visitor App
			</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="navbarColor01">
				{props.loggedIn ? (
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<Link to="/">Add Visitor</Link>
						</li>
						<li className="nav-item">
							<Link to="/log">Log</Link>
						</li>
						<li className="nav-item">
							<Link to="/logout">Logout</Link>
						</li>
					</ul>
				) : (
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to="/login">Login</Link>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

Nav.propTypes = {
	loggedIn: PropTypes.bool,
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
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);
