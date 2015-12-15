import React, { Component } from 'react'
import MainNav from './nav';
import '../styles/normalize.css';
import '../styles/main.scss';

export default class App extends Component{
  render(){
    return <div>
      <MainNav />
      {this.props.children}
    </div>;
  }
}
