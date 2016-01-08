import React, {Component} from 'react';
import FormControls from './formControls';

export default class AddCandidateForm extends Component{
  inputChangeHandler(){
    console.log(arguments);
  }
  render(){
    const { firstName, lastName, middleName, } = this.props;
    return <div className="form-contents">
      <input type="text"
            placeholder="First Name"
            value={firstName}
            onChange={ ev => {
              this.inputChangeHandler({firstName:ev.target.value});
            }}/>
      <input type="text"
            placeholder="Middle Name"
            value={middleName}
            onChange={ ev => {
              this.inputChangeHandler({firstName:ev.target.value});
            }}/>
      <input type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={ ev => {
              this.inputChangeHandler({firstName:ev.target.value});
            }}/>
          <div>party</div>
          <div>gender</div>
          <div>birthdate</div>
          <div>avatar link</div>
    </div>
  }
}
