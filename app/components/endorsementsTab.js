import React, { Component } from 'react';
import AddButton from './addButton';
import FormContainer from './formContainer';
import ModalWrapper from './modalWrapper';
import AddEndorsementForm from './addEndorsementForm';
import EditEndorsementForm from './editEndorsementForm';
import EndorsementList from './endorsementList';
import { connect } from 'react-redux';
import { getEndorsements, saveEndorsementEdits } from '../actions/endorsementActions';
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
  openEditForm = (id) => {
    this.setState({
      formOpen:true,
      formName: 'Edit Endorsement',
      formData: this.props.endorsements.find(
        endorsement => endorsement.id === id
      ) || {}
    });
  }
  updateEditForm = (data) => {
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
  saveAddForm = () => {
    console.log('save form');
    this.props.dispatch(saveEndorsement());
  }
  saveEdits = () => {
    const {id} = this.state.formData;
    var original = this.props.endorsements.find(
      endorsement => endorsement.id === id
    );
    if (JSON.stringify(this.state.formData) !== JSON.stringify(original)){
      const { id, date, source, confirmed } = this.state.formData;
      this.props.dispatch(saveEndorsementEdits({
        id,date,source,confirmed
      }));
    } else {
      console.log('nothing to save');
    }
  }
  renderForm(){
    const isAddForm = this.state.formName === 'Add Endorsement';
    return isAddForm ?
    <FormContainer closeHandler={this.closeForm}
                   saveHandler = {this.saveAddForm}
                   clearHandler = {this.clearForm}
                   formName={this.state.formName}>
      <AddEndorsementForm />
    </FormContainer> :
    <FormContainer closeHandler={this.closeForm}
                   saveHandler = {this.saveEdits}
                   formName={this.state.formName}>
      <EditEndorsementForm {...this.state.formData}
            changeHandler={this.updateEditForm}/>
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
