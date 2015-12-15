import {RECEIVE_TWEETS} from '../constants/tweetTypes.js';

const initialState=[];

export default function tweets(state=initialState, action){
  switch(action.type){
    case RECEIVE_TWEETS:
      return action.data;
    default:
      return state;
  }
}
