import React, { Component } from 'react';
import FormCheckBox from './formCheckBox';
import TextInputField from './textInputField';
import TagSelection from './tagSelection';
import shouldPureComponentUpdate from 'react-pure-render/function';

class EndorserInput extends Component{
  shouldComponentUpdate = shouldPureComponentUpdate;
  renderSelectedTags(endorserId, tags){
    return tags.map( tag => {
      console.log(tag);
      const { id, value } = tag;
      return <div key={id}
        className="flex-parent-row tag-choice selected"
        onClick={() => {
          const newTags = tags.filter(tag => tag.id !== id);
          this.props.inputChangeHandler(endorserId, {TAGS:newTags});
        }}>
        <span>{tag.value}</span>
        <span className="icon-close"></span>
      </div>
    });
  }
  render(){
    const { END_ID, NAME, DESCRIPT, WIKI_LINK, AVATAR, IS_ORG, TAGS, inputChangeHandler, copyHandler, removeHandler } = this.props;
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
                    <div>Tags</div>
      <TagSelection selectedData={TAGS}
                    handleSelection= { choice => {
                      console.log(choice);
                      inputChangeHandler(END_ID, {TAGS:[choice, ...TAGS]});
                    }}/>
      <div className="flex-parent-row wrap">
        {this.renderSelectedTags(END_ID, TAGS)}
      </div>
      <div className="flex-parent-row">
       <div className="flex-child-expand">
         <FormCheckBox label="is organization"
                       isChecked={IS_ORG}
                       checkHandler={() => {
                         inputChangeHandler(END_ID, {IS_ORG:!IS_ORG});
                       }}/>
       </div>
       <button className="btn-default no-border"
               onClick={ () => {
                 copyHandler(END_ID);
               }}>
         <span className="icon-blank icon-lg icon-naked icon-btn-form"></span>
       </button>
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
