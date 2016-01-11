import React, { Component } from 'react';
import FormCheckBox from './formCheckBox';
import TextInputField from './textInputField';
import shouldPureComponentUpdate from 'react-pure-render/function';

class EndorserInput extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  render(){
    const { id, firstName, lastName, isOrg, inputChangeHandler, removeHandler } = this.props;
    console.log(`render ${id} input`);
    return <div style={{marginBottom:'1em'}}>
      <TextInputField label='First Name'
                      value = {firstName}
                      changeHandler = {ev => {
                        inputChangeHandler(id,{firstName:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Last Name'
                      value = {lastName}
                      changeHandler = {ev => {
                        inputChangeHandler(id,{lastName:ev.target.value})
                      }}
                      {...this.props}/>
      <div className="flex-parent-row">
       <div className="flex-child-expand">
         <FormCheckBox label="is organization"
                       isChecked={isOrg}
                       checkHandler={ev => {
                         inputChangeHandler(id, {isOrg:!isOrg});
                       }}/>
       </div>
       <button className="btn-default no-border btn-naked"
               onClick={ () => {
                 removeHandler(id);
               }}>
         <span className="icon-trash-bin icon-lg icon-naked icon-btn-form"></span>
       </button>
      </div>
    </div>
  }
}

export default EndorserInput;
