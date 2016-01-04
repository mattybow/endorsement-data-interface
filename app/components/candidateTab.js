import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../actions/candidateActions';
import CandidateList from './candidateList';
import CandidateAdd from './candidateAdd';

function selectCandidates(state){
  const { candidates } = state;
  return { candidates };
}

class CandidateTab extends Component{
  componentWillMount(){
    this.props.dispatch(fetchCandidatesIfNeeded());
  }
  render(){
    return <div>
      <CandidateAdd />
      <CandidateList candidates={this.props.candidates}/>
    </div>;
  }
}

export default connect(selectCandidates)(CandidateTab);
