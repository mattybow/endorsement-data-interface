import React, { Component } from 'react';
import AddButton from './addButton';
import FormContainer from './formContainer';
import ModalWrapper from './modalWrapper';
import AddEndorsementForm from './addEndorsementForm';
import EditEndorsementForm from './editEndorsementForm';
import EndorsementList from './endorsementList';
import { connect } from 'react-redux';
import { getEndorsements } from '../actions/endorsementActions';
import { saveEndorsement, clearEndorsementForm } from '../actions/endorsementFormActions';


function selectData(state,props){
  return {
    endorsements:state.endorsements
  }
}

class EndorsementsTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      formOpen: false,
      formName: ''
    }
  }
  componentWillMount(){
    this.props.dispatch(getEndorsements());
  }
  openForm(){
    this.setState({formOpen:true, formName});
  }
  openAddForm = () => {
    this.setState({
      formOpen:true,
      formName: 'Add Endorsement'
    });
  }
  openEditForm = (data) => {
    this.setState({
      formOpen:true,
      formName: 'Edit Endorsement',
      formData: this.props.endorsements.find(
        endorsement => endorsement.id === data.id
      ) || {}
    });
  }
  updateEditForm = (data) => {
    console.log({...this.state, ...data});
    this.setState({ formData:{
      ...this.state.formData,
      ...data
    }});
  }
  clearForm = () => {
    this.props.dispatch(clearEndorsementForm());
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  saveForm = () => {
    console.log('save form');
    this.props.dispatch(saveEndorsement());
  }
  renderForm(){
    const isAddForm = this.state.formName === 'Add Endorsement';
    return <FormContainer closeHandler={this.closeForm}
                                   saveHandler = {this.saveForm}
                                   clearHandler = {this.clearForm}
                                   formName={this.state.formName}>
      { isAddForm ?
        <AddEndorsementForm />
        : <EditEndorsementForm {...this.state.formData}
            changeHandler={this.updateEditForm}/> }
    </FormContainer>
  }
  render(){
    return <div>
      <EndorsementList endorsements={this.props.endorsements}
                       editClickHandler={this.openEditForm}
                        />
      <AddButton clickHandler={this.openAddForm}
                 buttonText = 'Add Endorsement'/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? this.renderForm() : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectData)(EndorsementsTab);
