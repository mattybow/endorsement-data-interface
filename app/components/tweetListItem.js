import React, { Component } from 'react';
import moment from 'moment';

var TweetListItem = (props) => {
  const {text, link, created_at} = props.tweet;
  const time = moment(new Date(created_at)).format('lll');
  const isTouchDevice = 'ontouchstart' in window;
  const statusId = link.match(/[\d]*$/);
  return <li className="tweet-list-item">
    <div className="flex-parent-row">
      <div className="add-endorsement-holder flex-child-start">
        <span className="icon-plus"></span>
      </div>
      <a href={isTouchDevice ? `twitter://status?id=${statusId}` : link} className="tweet-content">
        <div style={{wordWrap: 'break-word'}}>{text}</div>
        <div style={{color:"#A06CD5"}}>{time}</div>
      </a>
      <div className="remove-tweet-holder flex-child-start">
        <span className="icon-trash-bin"></span>
      </div>
    </div>
  </li>;
};

export default TweetListItem;
