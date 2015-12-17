import { SET_LOGIN_INFO }from '../constants/loginTypes';

const initialState = {};

export default function loginInfo(state=initialState, action){
  switch(action.type){
    case SET_LOGIN_INFO:
      return action.loginInfo;
    default:
      return state;
  }
}
