import React, { Component } from 'react';
import FormCheckBox from './formCheckBox';
import TextInputField from './textInputField';
import shouldPureComponentUpdate from 'react-pure-render/function';

class EndorserInput extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  render(){
    const { END_ID, NAME, DESCRIPT, WIKI_LINK, isOrg, inputChangeHandler, removeHandler } = this.props;
    console.log(`render ${END_ID} input`);
    return <div className="input-group">
      <TextInputField label='Name'
                      value = {NAME}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{NAME:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Description'
                      value = {DESCRIPT}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{DESCRIPT:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Wikipedia'
                      value = {WIKI_LINK}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{WIKI_LINK:ev.target.value})
                      }}
                      {...this.props}/>
      <div className="flex-parent-row">
       <div className="flex-child-expand">
         <FormCheckBox label="is organization"
                       isChecked={isOrg}
                       checkHandler={ev => {
                         inputChangeHandler(END_ID, {isOrg:!isOrg});
                       }}/>
       </div>
       <button className="btn-default no-border btn-naked"
               onClick={ () => {
                 removeHandler(END_ID);
               }}>
         <span className="icon-trash-bin icon-lg icon-naked icon-btn-form"></span>
       </button>
      </div>
    </div>
  }
}

export default EndorserInput;
