import React, { Component } from 'react';
import TweetList from './tweetList';
import AddEndorsementForm from './addEndorsementForm';
import {connect} from 'react-redux';

import { fetchTweetsIfNeeded, requestTweetDelete } from '../actions/tweetActions';

function selectTweets(state){
  const {tweets} = state;
  return {tweets};
}

class TweetTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      formOpen:false
    }
  }
  openForm = () => {
    this.setState({formOpen:true});
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  fetchTweets = () => {
    console.log('fetch tweets');
    this.props.dispatch(fetchTweetsIfNeeded());
  }
  deleteTweet = (id) => {
    this.props.dispatch(requestTweetDelete(id));
  }
  render(){
    return <div>
      <TweetList tweets = {this.props.tweets}
                 addHandler = {this.openForm}
                 deleteTweet = {this.deleteTweet}
                 fetchTweets = {this.fetchTweets}/>
      { this.state.formOpen ? <AddEndorsementForm closeHandler={this.closeForm.bind(this)}/> : '' }
    </div>;
  }
}

export default connect(selectTweets)(TweetTab);
