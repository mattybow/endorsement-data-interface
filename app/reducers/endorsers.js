import { RECEIVE_ENDORSERS } from '../constants/endorserTypes';

export default function endorsers(state=[],action){
  switch(action.type){
    case RECEIVE_ENDORSERS:
      return action.data;
    default:
      return state;
  }
}
