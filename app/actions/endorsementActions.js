import { RECEIVE_ENDORSEMENTS } from '../constants/endorsementTypes';
import * as api from './api';

export function getEndorsementsIfNeeded(){
  return (dispatch,getState) => {
    api.getEndorsements().then(
      data => {
        dispatch(receiveEndorsements(data.data));
      },
      console.log
    )
  }
}

function receiveEndorsements(data){
  return {
    type: RECEIVE_ENDORSEMENTS,
    data
  }
}
