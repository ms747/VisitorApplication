import React, { Suspense, lazy } from "react";
import Head from "../components/table/head";
import axios from "axios";
import styled from "styled-components";
import { CancelToken } from "axios";
import Auth from "../components/auth";

const Body = lazy(() => import("../components/table/body"));
const source = CancelToken.source();

const Table = styled.table`
	width: 100%;
	th {
		border: 2px solid black;
	}
`;

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
			let data = await axios("http://10.10.10.1:7777/attendee", { cancelToken: source.token });
			data = await data.data;
			this.setState({ items: data });
		});
	};

	componentDidMount() {
		this.getData();
	}

	componentWillUnmount() {
		// const x = source.cancel("Component Unmounted");
		this.setState({ ismounted: false });
	}

	componentDid;

	render() {
		return (
			<Auth {...this.props}>
				<div>
					<h1>Guest Visit Records</h1>
					<React.Fragment>
						<Suspense fallback={<h1>Loading...</h1>}>
							<Table width="100%" border="1">
								<Head />
								<Body items={this.state.items} />
							</Table>
						</Suspense>
					</React.Fragment>
				</div>
			</Auth>
		);
	}
}

export default About;
