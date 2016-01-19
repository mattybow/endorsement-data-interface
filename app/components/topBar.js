import React, { Component } from 'react';
import LoginButton from './login';
import '../styles/nav.scss';

export default class TopBar extends Component{
  render(){
    return <div>
      <nav>
        <div className="flex-parent-row">
          <h2 className="brand title-font flex-child-expand">datas</h2>
          <LoginButton />
        </div>
      </nav>
    </div>;
  }
}
