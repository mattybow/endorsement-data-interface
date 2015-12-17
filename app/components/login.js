import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginInfo } from '../actions/loginActions';
import '../styles/login.scss';

function selectLoginInfo(state){
  console.log(state);
  const { loginInfo } = state;
  return { loginInfo };
}

class LoginButton extends Component{
  componentWillMount(){
    const userInfo = this.getLoginInfoFromCookies();
    this.props.dispatch(setLoginInfo(userInfo));
  }
  getLoginInfoFromCookies(){
    let loginInfo = {};
    const cookies = document.cookie;
    const loginCookie = cookies.match(/userInfo=.*;?/);
    if(loginCookie){
      const encodedInfo = loginCookie[0].replace(/;/,'').replace(/userInfo=/,'');
      loginInfo = JSON.parse(decodeURIComponent(encodedInfo));
    }
    return loginInfo;
  }
  render(){
    const { displayName, profile_image_url } = this.props.loginInfo;
    console.log(this.props);
    let content = <a href="/auth/twitter">login</a>
    if(displayName){
      content = <div className="flex-parent-row">
        <div className="profile-image-holder"><img src={profile_image_url} alt="" /></div>
      </div>;
    }
    return <div className="login-logout">{content}</div>;
  }
}

export default connect(selectLoginInfo)(LoginButton);
