import React, { Component } from 'react';
import { connect } from 'react-redux';
import EndorserList from './endorserList';
import FormContainer from './formContainer';
import EditEndorserForm from './editEndorserForm';
import ModalWrapper from './modalWrapper';
import { getEndorsersIfNeeded, saveEndorserEdits } from '../actions/endorserActions';

function selectData(state,props){
  const {endorsers} = state;
  return {endorsers};
}

class EndorserTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:'',
      formOpen:false
    }
  }
  componentWillMount(){
    this.props.dispatch(getEndorsersIfNeeded());
  }
  searchInputChangeHandler = (term) => {
    this.setState({searchTerm:term});
  }
  openEditForm = (id) => {
    this.setState({
      formOpen:true,
      formName: 'Edit Endorser',
      formData: this.getEndorserById(id) || {}
    });
  }
  getEndorserById(id){
    return this.props.endorsers.find(
      endorser => endorser.END_ID === id
    )
  }
  updateEditForm = (id, data) => {
    this.setState({ formData:{
      ...this.state.formData,
      ...data
    }});
  }

  closeForm = () => {
    this.setState({formOpen:false});
  }
  saveEdits = () => {
    const {END_ID} = this.state.formData;
    var original = this.getEndorserById(END_ID);
    if (JSON.stringify(this.state.formData) !== JSON.stringify(original)){
      const { id, date, source, confirmed, quote } = this.state.formData;
      this.props.dispatch(saveEndorserEdits({
        id,date,source,confirmed, quote
      })).then(
        () => {
          this.closeForm();
        }
      );
    } else {
      console.log('nothing to save');
    }
  }
  renderForm(){
    console.log(this.state.formData);
    return <FormContainer closeHandler={this.closeForm}
                   saveHandler = {this.saveEdits}
                   formName={this.state.formName}>
      <EditEndorserForm {...this.state.formData}
            changeHandler={this.updateEditForm}/>
    </FormContainer>
  }
  render(){
    return <div>
      <div className="flex-parent-row"
           style={{
             position:'relative'
           }}>
        <input type="text"
               placeholder="Search"
               value={this.state.searchTerm}
               onChange={ ev => {
                 this.searchInputChangeHandler(ev.target.value);
               }}
               className="input-center"
               style={{
                 paddingLeft:'3em',
                 paddingRight:'3em'
               }}/>
             <div className="icon-search icon-lg"
                    style={{
                      position:'absolute',
                      left:0,
                      top:3,
                      color:'#e0e0e0'
                    }}></div>
      </div>
      <EndorserList {...this.props}
                    filter={this.state.searchTerm}
                    editClickHandler={this.openEditForm}/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? this.renderForm() : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectData)(EndorserTab);
