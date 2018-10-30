import {LOGIN,LOGOUT} from "../actions/auth-actions";
const authState = {
	loggedIn: false,
};

const authReducer = (state = authState , action) => {
  if(action.type === LOGIN){
    return {...state,loggedIn:true};
  }

  if(action.type === LOGOUT){
    return {...state,loggedIn:false};
  }

  return state;
}

export default authReducer;