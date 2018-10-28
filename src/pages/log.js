import React, { Suspense, lazy } from "react";
import Head from "../components/table/head";
import axios from "axios";
import styled from "styled-components";
import Auth from "../components/auth";
const Body = lazy(() => import("../components/table/body"));

const Table = styled.table`
	width: 100%;
	th {
		border: 2px solid black;
	}
`;

class About extends React.Component {
	state = {
		items: [],
	};

	async componentWillMount() {
		let data = await axios("http://localhost:7777/attendee");
		data = await data.data;
		this.setState({ items: data });
	}

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
