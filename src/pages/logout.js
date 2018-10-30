import React from "react";
import {connect} from "react-redux";
import {actions} from "../store/actions/auth-actions";

class Logout extends React.Component{

  componentWillMount(){
    localStorage.clear();
    this.props.logout();
    this.props.history.push("/login")
  }

  componentWillUnMount(){
    localStorage.clear();
    this.props.logout();
    this.props.history.push("/login")
  }

  render(){
    return(
      null
    )
  }
}

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

export default connect(mapStateToProps,mapDispatchToProps)(Logout);