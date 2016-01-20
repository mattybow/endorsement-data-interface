import React, { Component } from 'react'

export default class EndorserList extends Component{
  render(){
    return <div>
      {this.props.endorsers.map(endorser => (
        <div className="flex-parent-row list-item-spacing" key={endorser.id}>
          <div className="endorser-img-holder">
               <div className="background-image-holder"
                   style={{
                     backgroundImage:`url(${endorser.AVATAR})`
                   }}>
               </div>
          </div>
          <div style={{borderBottom:'1px solid #E7E7EC', marginLeft:20, padding:'20px 0'}} className="flex-parent-row flex-child-expand">
            <div className="flex-child-expand" style={{fontSize:'1.2em'}}>
              <span>{endorser.NAME}</span>
            </div>
            <button className="btn-default no-border">
              edit
            </button>
          </div>
        </div>
      ))}
    </div>;
  }
}
