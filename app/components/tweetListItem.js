import React, { Component } from 'react';
import moment from 'moment';

var TweetListItem = (props) => {
  const {text, link, created_at} = props.tweet;
  const time = moment(new Date(created_at)).format('lll');
  return <li className="tweet-list-item">
    <a href={link}>
      <div>{text}</div>
      <div style={{color:"#A06CD5"}}>{time}</div>
    </a>
  </li>;
};

export default TweetListItem;
