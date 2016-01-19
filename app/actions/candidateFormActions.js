import { UPDATE_CANDIDATE, RECEIVE_CANDIDATE_DATA, REQUEST_CANDIDATE_SAVE, RESET_CANDIDATE_FORM } from '../constants/candidateFormTypes';
import { openSnackbar } from './snackbarActions';
import { addCandidate } from './candidateActions'
import * as api from './api';

export function updateCandidateForm(data){
  return {
    type:UPDATE_CANDIDATE,
    data
  }
}

export function resetCandidateForm(){
  return {
    type:RESET_CANDIDATE_FORM
  }
}

export function requestAddCandidate(data){
  return (dispatch, getState) => {
    const { candidateFormData } = getState();
    api.addCandidate(candidateFormData).then(
      ()=>{
        //add the candidate clientside
        dispatch(addCandidate(candidateFormData));
        //indicate that the persistance was successful
        dispatch(openSnackbar('SUCCESS', 'Candidate Created'));
        dispatch(resetCandidateForm());
      },
      ()=>{
        dispatch(openSnackbar('FAILURE', 'Server Error'));
      }
    )
  }
}
