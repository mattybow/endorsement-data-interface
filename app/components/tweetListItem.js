import React, { Component } from 'react';

var TweetListItem = (props) => {
  const {text, link, created_at} = props.tweet;
  return <li className="tweet-list-item">
    <a href={link}>
      <div>{text}</div>
    </a>
  </li>;
};

export default TweetListItem;
