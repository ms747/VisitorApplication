import {LOGIN,LOGOUT,SET_TOKEN} from "../actions/auth-actions";
const authState = {
  loggedIn: false,
  token:""
};

const authReducer = (state = authState , action) => {
  if(action.type === LOGIN){
    return {...state,loggedIn:true};
  }

  if(action.type === LOGOUT){
    return {...state,loggedIn:false};
  }

  if(action.type === SET_TOKEN){
    return {...state,token:action.token};
  }

  return state;
}

export default authReducer;