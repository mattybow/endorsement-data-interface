import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import { addEndorser,
         addEmptyEndorser,
         addCopyOfEndorser,
         updateEndorser,
         removeEndorser,
         updateEndorsementForm,
         updateEndorserTags } from '../actions/endorsementFormActions';
import { deleteTag } from '../actions/tagActions';
import EndorserInput from './endorserInput';
import TextInputField from './textInputField';
import EndorserSelection from './endorserSelection';
import Avatar from './avatar';
import {colors} from '../styles/inlineConstants'
import '../styles/forms.scss';

const {grey} = colors;

function selectFormData(state){
  const { endorsementFormData, candidates } = state;
  return { formData: endorsementFormData,
           candidates
         };
}

class AddEndorsementForm extends Component{
  componentWillMount(){
    this.props.dispatch(fetchCandidatesIfNeeded());
  }
  renderEndorserInputs(endorsers){
    return endorsers.map((endorser,i) => {
      return <EndorserInput key={endorser.END_ID}
                            handleSelection= {this.handleTagSelection}
                            copyHandler = {this.handleCopyClick}
                            inputChangeHandler= {this.endorserChangeHandler}
                            removeHandler = {this.endorserRemoveHandler}
                            {...endorser}/>;
    });
  }
  renderExistingEndorser(endorsers){
    return endorsers.map(endorser=><div style={{
      margin:'1em 0'
    }}
    key={endorser.END_ID}>
      <div className="flex-parent-row">
        <Avatar size={60}
                url={endorser.AVATAR}/>
          <div className="existing-endorser-info"
                style={{
            marginLeft:20
          }}>
          <div>{endorser.NAME}</div>
          <div style={{
            fontSize:'.8em'
          }}>{endorser.DESCRIPT}</div>
        </div>
        <button className="btn-default no-border btn-naked"
                onClick={ () => {
                  this.endorserRemoveHandler(endorser.END_ID);
                }}>
          <span className="icon-trash-bin icon-lg icon-naked icon-btn-form"></span>
        </button>
      </div>
    </div>)
  }
  newEndorserField(){
    this.props.dispatch(addEmptyEndorser());
  }
  handleCopyClick = (id) => {
    this.props.dispatch(addCopyOfEndorser(id))
  }
  handleTagSelection = (tag,selected) => {
    console.log(tag);

    // this.props.dispatch(updateEndorserTags(tag,selected));
    // const {isNew} = tag;
    // if(!selected && isNew){
    //   this.props.dispatch(deleteTag(tag.id));
    // }
  }
  handleEndorserSelection = (endorser) => {
    this.props.dispatch(addEndorser(endorser));
  }
  handleChange = (data) => {
    this.props.dispatch(updateEndorsementForm(data));
  }
  endorserChangeHandler = (...args) => {
    this.props.dispatch(updateEndorser.apply(this,args));
  }
  endorserRemoveHandler = (id) => {
    this.props.dispatch(removeEndorser(id));
  }
  candidateChangeHandler = (ev) => {
    const selectedId = ev.target.value;
    this.props.dispatch(updateEndorsementForm({selectedCandidate:selectedId}));
  }
  render(){
    const { candidates,
            formData:{
              endorsers,
              selectedCandidate,
              tweetText,
              selectedTags,
              source,
              date
            }
          } = this.props;

    return <div className="form-contents">
      <div className="quoted-tweet">{tweetText}</div>
      <div className="reference-input">
        <h3>Reference</h3>
        <TextInputField label='Date'
                        value = {date}
                        placeholder="YYYY-MM-DD"
                        changeHandler = {ev => {
                          this.handleChange({date:ev.target.value});
                        }}
                        {...this.props}/>
        <TextInputField label='Source'
                        value = {source}
                        changeHandler = {ev => {
                          this.handleChange({source:ev.target.value});
                        }}
                        {...this.props}/>
      </div>
      <div className="candidate-input">
        <h3>Candidate</h3>
        <div className="form-select">
          <select name="candidate"
                  id="selectCandidate"
                  onChange={this.candidateChangeHandler}
                  value={selectedCandidate}>
            <option value="" key="null">Select a candidate</option>
            {candidates.map( candidate => (
              <option value={candidate.CAN_ID}
                      key={candidate.CAN_ID}>
                      {candidate.FIRST_NAME} {candidate.LAST_NAME}
              </option>))}
          </select>
        </div>
      </div>
      <div className="endorser-input">
        <div className="flex-parent-row">
          <h3 className="flex-child-expand">Endorsers ({endorsers.length})</h3>
          <button className="no-border btn-naked" onClick={::this.newEndorserField}>
            <span className="icon-plus icon-lg icon-naked icon-btn-form"></span>
          </button>
        </div>
      </div>
      <EndorserSelection selectedData={endorsers}
                         handleSelection={this.handleEndorserSelection}/>
      { this.renderExistingEndorser(endorsers.filter(endorser => !endorser.IS_NEW))}
      { this.renderEndorserInputs(endorsers.filter(endorser => endorser.IS_NEW)) }
      <div className="endorser-tags"
        style={{
          paddingBottom:400
        }}>

      </div>
    </div>;
  }
}

export default connect(selectFormData)(AddEndorsementForm)
