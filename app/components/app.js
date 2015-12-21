import React, { Component } from 'react'
import TopBar from './topBar';
import NavBar from './navBar';
import '../styles/normalize.css';
import '../styles/main.scss';

export default class App extends Component{
  render(){
    return <div>
      <TopBar />
      <NavBar />
      {this.props.children}
    </div>;
  }
}
