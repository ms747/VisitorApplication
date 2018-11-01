import React, { Suspense, lazy } from "react";
import Head from "../components/table/head";
import axios from "axios";
import Auth from "../components/auth";

const Body = lazy(() => import("../components/table/body"));

class About extends React.Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
	}
	state = {
		items: [],
		ismounted: false,
	};

	getData = () => {
		this.setState({ ismounted: true }, async () => {
			let data = await axios("http://10.10.10.1:7777/attendee");
			data = await data.data;
			this.setState({ items: data });
		});
	};

	componentDidMount() {
		this.getData();
	}

	componentWillUnmount() {
		this.setState({ ismounted: false });
	}

	componentDid;

	render() {
		return (
			<Auth {...this.props}>
				<div>
					<h1 style={{ margin: "1rem 0" }}>Guest Visits Records</h1>
					<React.Fragment>
						<Suspense fallback={<h1>Loading...</h1>}>
							<table className="table table-dark" width="100%">
								<Head />
								<Body items={this.state.items} />
							</table>
						</Suspense>
					</React.Fragment>
				</div>
			</Auth>
		);
	}
}

export default About;
