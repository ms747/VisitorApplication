import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Head from "../components/table/head";
import axios from "axios";
import styled from "styled-components";
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
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<h1>Guest Visit Records</h1>
				<Link to="/">Home</Link>
				<React.Fragment>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Table width="100%" border="1">
							<Head />
							<Body items={this.state.items} />
						</Table>
					</Suspense>
				</React.Fragment>
			</div>
		);
	}
}

export default About;
