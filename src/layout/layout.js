import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "../components/nav/nav";
import Home from "../pages/home";
import Log from "../pages/log";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Logout from "../pages/logout";

const Layout = props => {
	return (
		<Fragment>
			<Nav />
			<h1 style={{ textAlign: "center" }}>Visitor Application</h1>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/log" exact component={Log} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/logout" exact component={Logout} />
				<Route path="*">
					<h1>404 Not Found</h1>
				</Route>
			</Switch>
		</Fragment>
	);
};

export default Layout;
