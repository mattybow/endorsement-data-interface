import * as ACTION_TYPES from '../constants/tweetTypes';
import * as api from './api';

const { REQUEST_TWEETS,
        REQUEST_TWEETS_FAIL,
        RECEIVE_TWEETS } = ACTION_TYPES;

export function fetchTweetsIfNeeded(){
  return (dispatch, getState) => {
    dispatch(requestTweets());
    api.getTweets().then(
      data => {
        dispatch(receiveTweets(data.data));
      },
      err => {
        dispatch(requestTweetsFail(err));
      });
  }
}

function requestTweets(){
  console.log('request tweets');
  return {
    type: REQUEST_TWEETS
  }
}

function requestTweetsFail(err){
  console.log('request tweets fail');
	return {
		type:REQUEST_TWEETS_FAIL,
		err
	};
}

function receiveTweets(data){
  return {
    type: RECEIVE_TWEETS,
    data
  }
}
