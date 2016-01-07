import React, { Component } from 'react';
import TweetList from './tweetList';
import AddEndorsementForm from './addEndorsementForm';
import LoadingIndicator from './loadingIndicator';
import ModalWrapper from './modalWrapper';
import FormContainer from './formContainer';
import {connect} from 'react-redux';

import { fetchTweetsIfNeeded, requestTweetDelete } from '../actions/tweetActions';
import { updateEndorsementForm } from '../actions/endorsementFormActions';

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
  componentWillMount(){
    this.props.dispatch(fetchTweetsIfNeeded());
  }
  openForm = (tweetText) => {
    this.props.dispatch(updateEndorsementForm({tweetText}));
    this.setState({formOpen:true});
  }
  closeForm = () => {
    this.setState({formOpen:false});
  }
  deleteTweet = (id) => {
    this.props.dispatch(requestTweetDelete(id));
  }
  render(){
    const noTweets = !this.props.tweets.length;

    if(noTweets){
      return <LoadingIndicator />
    }

    const addForm = <FormContainer formName="Add Endorsement"
                   closeHandler={this.closeForm}>
      <AddEndorsementForm />
    </FormContainer>;

    return <div>
      <TweetList tweets = {this.props.tweets}
                 addHandler = {this.openForm}
                 deleteTweet = {this.deleteTweet}/>
      <ModalWrapper isOpen={this.state.formOpen}>
        { this.state.formOpen ? addForm : '' }
      </ModalWrapper>
    </div>;
  }
}

export default connect(selectTweets)(TweetTab);
