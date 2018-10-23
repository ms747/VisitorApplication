import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Table = styled.table`
    border:1px solid black;
`;

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>Log</h1>
        <Link to="/">Home</Link>
        <Table width="100%">
          <tr>
            <th>Name</th>
            <th>Picture</th>
            <th>To Meet</th>
            <th>In Time</th>
            <th>Reason</th>
          </tr>
        </Table>
      </div>
    );
  }
}

export default About;
