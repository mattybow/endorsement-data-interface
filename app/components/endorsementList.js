import React, { Component } from 'react';
import moment from 'moment';
import Avatar from './avatar';

export default class EndorsementList extends Component{
  renderEndorsements() {
    return this.props.endorsements.map(endorsement => {
      const { end_avatar, can_avatar, endorser, candidate, id,date} = endorsement;
      return <div className="flex-parent-row list-item-spacing" key={id}>
        <div className="heads"
             style={{
               position:'relative'
             }}>
          <Avatar url={end_avatar}
                  size={50}/>
          <div style={{
              width:40,
              height:40,
              position:'absolute',
              right:-20,
              bottom:-20,
              backgroundImage:`url(${can_avatar})`,
              backgroundSize:'cover'
            }}></div>
        </div>
        <div style={{borderBottom:'1px solid #E7E7EC', marginLeft:40, padding:'20px 0'}} className="flex-parent-row flex-child-expand">
          <div className="flex-child-expand">
            <div>
              <span>{endorser}</span>
              <span style={{ fontSize:'.8em', margin:'0 .5em'}}>endorsed</span>
              <span>{candidate}</span>
            </div>
            <div style={{ fontSize:'.8em', color:'#8F2CD8'}}>{moment(new Date(date)).format('ll')}</div>
          </div>
          <button className="btn-default no-border">
            edit
          </button>
        </div>
      </div>
    })
  }
  render(){
    const endorsements = this.renderEndorsements();
    return <div>
      {endorsements}
    </div>;
  }
}
