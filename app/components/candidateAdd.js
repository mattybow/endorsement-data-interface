import React, { Component } from 'react'

export default class CandidateAdd extends Component{
  render(){
    return <div style={{marginTop:'1em'}}>
      <button className="btn-default flex-parent-row" style={{borderStyle:'solid none', padding:'1em', width:'100%', textAlign:'left'}}>
        <span className="flex-child-expand">Add Candidate</span>
        <span className="icon-plus icon-md"></span>
      </button>
    </div>;
  }
}
