import React, { Component } from 'react';
import { connect } from 'react-redux';
import EndorserList from './endorserList';
import { getEndorsersIfNeeded } from '../actions/endorserActions';

function selectData(state,props){
  const {endorsers} = state;
  return {endorsers};
}

class EndorserTab extends Component{
  componentWillMount(){
    this.props.dispatch(getEndorsersIfNeeded());
  }
  render(){
    return <EndorserList {...this.props}/>;
  }
}

export default connect(selectData)(EndorserTab);
