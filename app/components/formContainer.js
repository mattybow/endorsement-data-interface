import React, { Component } from 'react';
import FormControls from './formControls';

export default class FormContainer extends Component{
  render(){
    return <div className="form-container">
      <h2>{this.props.formName}</h2>
      <hr/>
      <FormControls {...this.props}/>
      {this.props.children}
    </div>;
  }
}
