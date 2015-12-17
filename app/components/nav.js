import React, { Component } from 'react';
import LoginButton from './login';
import '../styles/nav.scss';

export default class MainNav extends Component{
  render(){
    return <div>
      <nav>
        <div className="flex-parent-row">
          <h2 className="title-font flex-child-expand">datas</h2>
          <LoginButton />
        </div>
      </nav>
    </div>;
  }
}
