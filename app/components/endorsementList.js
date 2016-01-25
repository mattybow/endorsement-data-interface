import React, { Component } from 'react';
import moment from 'moment';
import Avatar from './avatar';
import { colors } from '../styles/inlineConstants';

const {barney, grey} = colors;

export default class EndorsementList extends Component{
  renderEndorsements() {
    return this.props.endorsements.map(endorsement => {
      const { can_id, end_avatar, can_avatar, endorser, candidate, id, date, confirmed} = endorsement;
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
        <div style={{borderBottom:`1px solid ${grey}`, marginLeft:40, padding:'30px 0'}} className="flex-parent-row flex-child-expand">
          <div className="flex-child-expand">
            <div>
              <span>{endorser}</span>
              <span style={{ fontSize:'.8em', margin:'0 .5em'}}>{confirmed ? "endorsed" : "will endorse"}</span>
              <span>{candidate}</span>
            </div>
            <div style={{ fontSize:'.8em', color:barney}}>{moment(new Date(date)).format('ll')}</div>
          </div>
          <button className="btn-default no-border"
                  onClick={() => {
                    this.props.editClickHandler(id);
                  }}>
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
