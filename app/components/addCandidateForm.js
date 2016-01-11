import React, {Component} from 'react';
import FormControls from './formControls';
import TextInputField from './textInputField';
import { connect } from 'react-redux';
import RadioGroup from './radioGroup';
import { updateCandidateForm } from '../actions/candidateFormActions';
import moment from 'moment';

function selectCandidateFormData(state){
  const { candidateFormData } = state;
  return { formData: candidateFormData };
}

function convertDate(date){
  if(date && date.match(/(\d{2}\-){2}\d{4}T/)){
    return moment(new Date(date)).format('MM-DD-YYYY');
  }
  return date;
}

const PARTY_CHOICES=[
  { value: 'D',
    label: 'Democrat' },
  { value: 'R',
    label: 'Republican' }
];

const GENDER_CHOICES=[
  { value: 'M',
    label: 'Male' },
  { value: 'F',
    label: 'Female' }
]

class AddCandidateForm extends Component{
  inputChangeHandler(data){
    this.props.dispatch(updateCandidateForm(data));
  }
  render(){
    const { formData: {CAN_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, DOB, GENDER, PARTY} } = this.props;
    return <div className="form-contents">
      <TextInputField label='FEC Id'
                      value = {CAN_ID}
                      changeHandler = {ev => {
                        this.inputChangeHandler({CAN_ID:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='First Name'
                      value = {FIRST_NAME}
                      changeHandler = {ev => {
                        this.inputChangeHandler({FIRST_NAME:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Middle Name'
                      value = {MIDDLE_NAME}
                      changeHandler = {ev => {
                        this.inputChangeHandler({MIDDLE_NAME:ev.target.value})
                      }}
                      {...this.props}/>
      <TextInputField label='Last Name'
                      value = {LAST_NAME}
                      changeHandler = {ev => {
                        this.inputChangeHandler({LAST_NAME:ev.target.value})
                      }}
                      {...this.props}/>
      <div className="input-field">
        <label className="non-mui">Party</label>
        <RadioGroup name="party"
                    value={PARTY}
                    changeHandler = {ev => {
                      this.inputChangeHandler({PARTY:ev.target.value})
                    }}
                    choices = {PARTY_CHOICES}
                    style={{marginBottom:'.5em', width:'50%', display:'inline-block', height:'1em'}}/>
      </div>
      <div className="input-field">
        <label className="non-mui">Gender</label>
        <RadioGroup name="gender"
                    value={GENDER}
                    changeHandler = {ev => {
                      this.inputChangeHandler({PARTY:ev.target.value})
                    }}
                    choices = {GENDER_CHOICES}
                    style={{marginBottom:'.5em', width:'50%', display:'inline-block', height:'1em'}}/>
      </div>
      <TextInputField label='Birthdate'
                      placeholder="MM-DD-YYYY"
                      value={convertDate(DOB)}
                      changeHandler = {ev => {
                        this.inputChangeHandler({DOB:ev.target.value})
                      }}
                      {...this.props}/>

      <TextInputField label='Avatar Link'
                      dataKey = 'lastName'
                      changeHandler = {this.inputChangeHandler}
                      {...this.props}/>
    </div>
  }
}

export default connect(selectCandidateFormData)(AddCandidateForm)
