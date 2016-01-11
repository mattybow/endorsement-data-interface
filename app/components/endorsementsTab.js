import React, { Component } from 'react';
import AddButton from './addButton';
import FormContainer from './formContainer';
import ModalWrapper from './modalWrapper';
import AddEndorsementForm from './addEndorsementForm';

export default class EndorsementsTab extends Component{
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
  }
  render(){
    const addForm = <FormContainer closeHandler={this.closeForm}
                                   saveHandler = {this.saveForm}
                                   formName="Add Endorsment">
      <AddEndorsementForm />
    </FormContainer>
    return <div>
      <AddButton clickHandler={this.openForm}
                 buttonText = 'Add Endorsement'/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? addForm : '' }
      </ModalWrapper>
    </div>;
  }
}
