import React, { Component } from 'react';
import moment from 'moment';

var TweetListItem = (props) => {
  const {text, link, created_at} = props.tweet;
  const time = moment(new Date(created_at)).format('lll');
  return <li className="tweet-list-item">
    <div className="flex-parent-row">
      <div className="add-endorsement-holder flex-child-start" style={{fontSize:'2em', padding:'0 1em 0 0', color:'#8F2CD8'}}>
        <span className="icon-plus"></span>
      </div>
      <a href={link} className="flex-child-expand">
        <div style={{wordWrap: 'break-word'}}>{text}</div>
        <div style={{color:"#A06CD5"}}>{time}</div>
      </a>
      <div className="remove-tweet-holder flex-child-start" style={{fontSize:'2em', padding:'0 0 0 1em', color:'#8F2CD8'}}>
        <span className="icon-trash-bin"></span>
      </div>
    </div>
  </li>;
};

export default TweetListItem;
