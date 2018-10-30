import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {connect} from "react-redux";
import {actions} from "../../store/actions/auth-actions";

const Navbar = styled.nav`
	display: grid;
	grid-template-columns: 40% auto;
	background: black;
	color: white;
	margin: 0;
	padding: 0;
	& > ul {
		display: flex;
		list-style: none;
		justify-self: right;
		align-items: center;
		li {
			padding: 0 20px;
			a {
				text-decoration: none;
				color: white;
			}
		}
	}
`;

const Nav = props => {
	return (
		<Navbar>
			<h1>Visitor App</h1>
				{
					 props.loggedIn ? (
						<ul>
							<li>
								<Link to="/">Add Visitor</Link>
							</li>
							<li>
								<Link to="/log">Log</Link>
							</li>
							<li>
								<Link to="/logout">Logout</Link>
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					)
				}
		</Navbar>
	);
};

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return {
		login() {
			dispatch(actions.login());
		},
		logout(){
			dispatch(actions.logout());
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav);
