import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import CandidateList from './candidateList';
import AddButton from './addButton';
import ModalWrapper from './modalWrapper';
import AddCandidateForm from './addCandidateForm';
import FormContainer from './formContainer';
import { requestAddCandidate } from '../actions/candidateFormActions';

function selectCandidates(state){
  const { candidates } = state;
  return { candidates };
}

class CandidateTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      formOpen: false
    }
  }
  openForm = () => {
    this.setState({formOpen:true});
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  saveForm = () => {
    console.log('save form');
    this.props.dispatch(requestAddCandidate());
  }
  componentWillMount(){
    this.props.dispatch(fetchCandidatesIfNeeded());
  }
  render(){
    const addForm = <FormContainer closeHandler={this.closeForm}
                                   saveHandler = {this.saveForm}
                                   formName="Add Candidate">
      <AddCandidateForm />
    </FormContainer>
    return <div>
      <AddButton clickHandler={this.openForm}
                 buttonText = 'Add Candidate'/>
      <CandidateList candidates={this.props.candidates}/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? addForm : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectCandidates)(CandidateTab);
