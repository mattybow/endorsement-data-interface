import React, { Component } from 'react'
import TopBar from './topBar';
import NavBar from './navBar';
import '../styles/normalize.css';
import '../styles/main.scss';

export default class App extends Component{
  render(){
    const touchCapable = 'ontouchstart' in window ? 'touch' : '';
    return <div className={touchCapable}>
      <TopBar />
      <NavBar />
      <div id="tab-contents">
        {this.props.children}
      </div>
    </div>;
  }
}
