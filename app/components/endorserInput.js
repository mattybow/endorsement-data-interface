import React, { Component } from 'react';
import FormCheckBox from './formCheckBox';
import TextInputField from './textInputField';
import shouldPureComponentUpdate from 'react-pure-render/function';

class EndorserInput extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  render(){
    const { END_ID, NAME, DESCRIPT, WIKI_LINK, AVATAR, IS_ORG, inputChangeHandler, removeHandler } = this.props;
    console.log(`render ${END_ID} input`);
    return <div className="input-group">
      <TextInputField label='Name'
                      value = {NAME}
                      id={END_ID}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{NAME:ev.target.value})
                      }}/>
      <TextInputField label='Description'
                      value = {DESCRIPT}
                      id={END_ID}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{DESCRIPT:ev.target.value})
                      }}/>
      <TextInputField label='Wikipedia'
                      value = {WIKI_LINK}
                      id={END_ID}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{WIKI_LINK:ev.target.value})
                      }}/>
      <TextInputField label='Avatar'
                      value = {AVATAR}
                      id={END_ID}
                      changeHandler = {ev => {
                        inputChangeHandler(END_ID,{AVATAR:ev.target.value})
                      }}/>
      <div className="flex-parent-row">
       <div className="flex-child-expand">
         <FormCheckBox label="is organization"
                       isChecked={IS_ORG}
                       checkHandler={ev => {
                         inputChangeHandler(END_ID, {IS_ORG:!IS_ORG});
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
