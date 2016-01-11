import { UPDATE_CANDIDATE, RECEIVE_CANDIDATE_DATA, REQUEST_CANDIDATE_SAVE, RESET_CANDIDATE_FORM } from '../constants/candidateFormTypes';

const initialState = {
  AVATAR: null,
  CAN_ID: null,
  DOB: null,
  FIRST_NAME: null,
  GENDER: 'M',
  LAST_NAME: null,
  MIDDLE_NAME: null,
  PARTY: 'R'
}

export default function candidateFormData(state=initialState,action){
  switch(action.type){
    case UPDATE_CANDIDATE:
      return {...state,...action.data};
    case RESET_CANDIDATE_FORM:
      return initialState;
    default:
      return state;
  }
}
