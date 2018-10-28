import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "../components/nav/nav";
import Home from "../pages/home";
import Log from "../pages/log";
import Login from "../pages/login";
import Signup from "../pages/signup";

const Layout = props => {
	return (
		<div>
			<Nav />
			<h1 style={{ textAlign: "center" }}>Visitor Application</h1>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/log" exact component={Log} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
				<Route path="*">
					<h1>404 Not Found</h1>
				</Route>
			</Switch>
		</div>
	);
};

export default Layout;
