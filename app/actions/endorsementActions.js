import { RECEIVE_ENDORSEMENTS } from '../constants/endorsementTypes';
import { openSnackbar } from './snackbarActions';
import * as api from './api';

export function getEndorsements(){
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


export function saveEndorsementEdits(data){
  return (dispatch,getState) => {
    api.saveEndorsementEdits(data).then(
      data => {
        dispatch(openSnackbar('SUCCESS', 'Changes Saved'));
      },
      console.log
    )
  }
}
