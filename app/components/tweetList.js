import React, { Component } from 'react';
import TweetListItem from './tweetListItem';
import * as tweetActions from '../actions/tweetActions';
import {connect} from 'react-redux';

import '../styles/tweetList.scss'

function selectTweets(state){
  const {tweets} = state;
  return {tweets};
}

class TweetListView extends Component{
  componentDidMount(){
    const {fetchTweetsIfNeeded} = tweetActions;
    this.props.dispatch(fetchTweetsIfNeeded());
  }
  render(){
    //console.log(this.props);
    const {tweets} = this.props;
    const tweetItems = tweets.map((tweet, i) => <TweetListItem tweet={tweet} key={i} />);
    return <ul className="tweet-list">
      {tweetItems}
    </ul>;
  }
}

export default connect(selectTweets)(TweetListView);
