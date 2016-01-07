import React, { Component } from 'react'

export default class CandidateList extends Component{
  renderCandidates(){
    const { candidates } = this.props;
    return candidates.map(candidate => {
      const { FIRST_NAME, LAST_NAME, AVATAR, CAN_ID } = candidate;
      return (
        <div className="flex-parent-row list-item-spacing" key={CAN_ID}>
          <div>
            <img src={AVATAR} alt="" style={{maxWidth:60}}/>
          </div>
          <div style={{borderBottom:'1px solid #E7E7EC', marginLeft:20, padding:'20px 0'}} className="flex-parent-row flex-child-expand">
            <div className="flex-child-expand" style={{fontSize:'1.2em'}}>
              <span>{FIRST_NAME}&nbsp;</span>
              <span>{LAST_NAME}</span>
            </div>
            <button className="btn-default no-border">
              edit
            </button>
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
