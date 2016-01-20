import React, { Component } from 'react';
import { connect } from 'react-redux';
import EndorserList from './endorserList';
import { getEndorsersIfNeeded } from '../actions/endorserActions';

function selectData(state,props){
  const {endorsers} = state;
  return {endorsers};
}

class EndorserTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:''
    }
  }
  componentWillMount(){
    this.props.dispatch(getEndorsersIfNeeded());
  }
  searchInputChangeHandler = (term) => {
    this.setState({searchTerm:term});
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
      <EndorserList {...this.props} filter={this.state.searchTerm}/>
    </div>;
  }
}

export default connect(selectData)(EndorserTab);
