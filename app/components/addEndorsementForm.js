import React, { Component } from 'react';
import FormInputText from './formInputText';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
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
  render(){
    const { candidates,
            formData:{
              firstName,
              lastName,
              candidate,
              tweetText
            }
    } = this.props;
    return <div id="addEndorsementForm" className="form-container">
      <h3>Add Endorsement</h3>
      <hr/>
      <div className="form-controls" style={{position:'absolute', right:'-4em', top:0}}>
        <div className="icon-check-mark icon-lg" style={{marginBottom:'.5em'}}></div>
        <div className="icon-close icon-lg" onClick={this.props.closeHandler}></div>
      </div>
      <div className="quoted-tweet">{tweetText}</div>
      <div className="candidate-input">
        <h4>Candidate</h4>
        <select name="candidate" id="selectCandidate">
          {candidates.map( candidate => (<option value={candidate.CAN_ID}>{candidate.FIRST_NAME} {candidate.LAST_NAME}</option>))}
        </select>
      </div>
      <div className="endorser-input">
        <h4>Endorser</h4>
        <FormInputText inputName="endorser-first-name"
                       label = 'FIRST NAME'
                       data={firstName}/>
        <FormInputText inputName="endorser-last-name"
                       label = 'LAST NAME'
                       data={lastName}/>
      </div>
    </div>;
  }
}

export default connect(selectFormData)(AddEndorsementForm)
