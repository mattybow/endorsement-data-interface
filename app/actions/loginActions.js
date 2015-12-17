import { SET_LOGIN_INFO }from '../constants/loginTypes';

export function setLoginInfo(loginInfo){
  return {
    type:SET_LOGIN_INFO,
    loginInfo
  }
}
