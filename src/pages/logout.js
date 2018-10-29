import React from "react";
import AuthContext from "../context/auth-context";


class Logout extends React.Component{

  static contextType = AuthContext;

  componentWillMount(){
    localStorage.clear();
    this.context.logout();
    this.props.history.push("/login")
  }

  render(){
    return(
      null
    )
  }
}

export default Logout;