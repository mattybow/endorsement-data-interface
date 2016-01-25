import {RECEIVE_ENDORSERS} from '../constants/endorserTypes';
import { openSnackbar } from './snackbarActions';
import * as api from './api';

export function getEndorsersIfNeeded(){
  return (dispatch,getState) => {
    api.getEndorsers().then(
      data => {
        dispatch(receiveEndorsers(data.data));
      },
      err => {
        console.log(err);
      }
    )
  }
}

function receiveEndorsers(data){
  return {
    type:RECEIVE_ENDORSERS,
    data
  }
}


export function saveEndorserEdits(){
  return (dispatch, getState) => {
    return api.saveEndorserEdits().then(
      data => {
        dispatch(openSnackbar('SUCCESS','Changes Saved'));
        dispatch(getEndorsersIfNeeded());
      },
      console.log
    )
  }
}
