import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  fieldset > div{
    display:flex;
    flex-direction:column;
  }

  fieldset > div > label{
    align-self:flex-start;
  }
`;

class Home extends React.Component {
  state = {
    name: "Mayur Shah",
    img: "https://unsplash.it/200/200",
    intime: `${new Date(Date.now())}`,
    tomeet: "Ganesh Shah",
    reason: "Application Demo"
  };

  handleForm = e => {
    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/about">Log</Link>
        <Form onSubmit={this.handleForm}>
          <fieldset>
            <div>
              <label htmlFor="name">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="picture">
                <p>Picture</p>
                <img src={this.state.img} alt="" name="picture" id="picture" />
              </label>

              <label htmlFor="tomeet">
                <p>To Meet</p>
                <input
                  type="text"
                  name="tomeet"
                  id="tomeet"
                  placeholder="To Meet"
                  value={this.state.tomeet}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="reason">
                <p>Reason</p>
                <textarea
                  type="text"
                  name="reason"
                  id="reason"
                  placeholder="Reason"
                  value={this.state.reason}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <input type="submit" value="Add" />
            </div>
          </fieldset>
        </Form>
      </div>
    );
  }
}

export default Home;
