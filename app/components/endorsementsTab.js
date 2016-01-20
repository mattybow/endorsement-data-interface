import React, { Component } from 'react';
import AddButton from './addButton';
import FormContainer from './formContainer';
import ModalWrapper from './modalWrapper';
import AddEndorsementForm from './addEndorsementForm';
import EndorsementList from './endorsementList';
import { connect } from 'react-redux';
import { getEndorsementsIfNeeded } from '../actions/endorsementActions';
import { saveEndorsement } from '../actions/endorsementFormActions';


function selectData(state,props){
  return {
    endorsements:state.endorsements
  }
}

class EndorsementsTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      formOpen: false
    }
  }
  componentWillMount(){
    this.props.dispatch(getEndorsementsIfNeeded());
  }
  openForm = () => {
    this.setState({formOpen:true});
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  saveForm = () => {
    console.log('save form');
    this.props.dispatch(saveEndorsement());
  }
  render(){
    const addForm = <FormContainer closeHandler={this.closeForm}
                                   saveHandler = {this.saveForm}
                                   formName="Add Endorsment">
      <AddEndorsementForm />
    </FormContainer>
    return <div>
      <EndorsementList endorsements={this.props.endorsements}/>
      <AddButton clickHandler={this.openForm}
                 buttonText = 'Add Endorsement'/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? addForm : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectData)(EndorsementsTab);
