import { REQUEST_CANDIDATES, RECEIVE_CANDIDATES } from '../constants/candidateTypes';

export default function candidates(state=[], action){
  switch (action.type){
    case RECEIVE_CANDIDATES:
      return action.data;
    default:
      return state;
  }
}
