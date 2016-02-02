import React, { Component } from 'react';
import Avatar from './avatar';

export default class EndorserList extends Component{
  renderEndorsers(){
    return this.props.endorsers.filter(
      endorser => endorser.name.match(new RegExp(`${this.props.filter}`,'i')) ? true : false
    ).map(endorser => (
      <div className="flex-parent-row list-item-spacing" key={endorser.id}>
        <Avatar url={endorser.avatar}/>
        <div style={{borderBottom:'1px solid #E7E7EC', marginLeft:20, padding:'20px 0'}} className="flex-parent-row flex-child-expand">
          <div className="flex-child-expand">
            <span>{endorser.name}</span>
          </div>
          <button className="btn-default no-border" onClick={() => {
              this.props.editClickHandler(endorser.id);
            }}>
            edit
          </button>
        </div>
      </div>
    ));
  }
  render(){
    const endorsers = this.renderEndorsers();
    return <div>
      {endorsers.length ? endorsers : <div>no matching endorsers</div>}
    </div>;
  }
}
