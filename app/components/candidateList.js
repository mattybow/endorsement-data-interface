import React, { Component } from 'react'

export default class CandidateList extends Component{
  renderCandidates(){
    const { candidates } = this.props;
    return candidates.map(candidate => {
      const { FIRST_NAME, LAST_NAME, AVATAR } = candidate;
      return (
        <div className="flex-parent-row list-item-spacing">
          <div className="flex-child-start">
            <img src={AVATAR} alt="" style={{maxWidth:60}}/>
          </div>
          <div className="flex-child-expand" style={{paddingLeft:20}}>
            <span>{FIRST_NAME}&nbsp;</span>
            <span>{LAST_NAME}</span>
          </div>
          <div className="btn-default">
            edit
          </div>
        </div>
      );
    });
  }
  render(){
    return <div>
      { this.renderCandidates() }
    </div>;
  }
}
