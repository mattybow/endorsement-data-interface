import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import { addEndorser, updateEndorser, removeEndorser, updateEndorsementForm } from '../actions/endorsementFormActions';
import EndorserInput from './endorserInput';
import '../styles/forms.scss';

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
      return <EndorserInput key={endorser.id}
                            inputChangeHandler= {this.endorserChangeHandler}
                            removeHandler = {this.endorserRemoveHandler}
                            {...endorser}/>;
    });
  }
  newEndorserField(){
    this.props.dispatch(addEndorser());
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
              tweetText
            }
    } = this.props;

    return <div className="form-contents">
      <div className="quoted-tweet">{tweetText}</div>
      <div className="candidate-input">
        <h3>Candidate</h3>
        <div className="form-select">
          <select name="candidate"
                  id="selectCandidate"
                  onChange={this.candidateChangeHandler}
                  value={selectedCandidate}>
            <option value="null" key="null">Select a candidate</option>
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
      { this.renderEndorserInputs(endorsers) }
      <div className="endorser-tags">
        <h3>Endorser Tags</h3>
      </div>
    </div>;
  }
}

export default connect(selectFormData)(AddEndorsementForm)
