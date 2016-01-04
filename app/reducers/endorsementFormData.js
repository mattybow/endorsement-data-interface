import { UPDATE_ENDORSEMENT_FORM } from '../constants/endorsementFormTypes';

export default function endorsementFormData(state={}, action){
  switch(action.type){
    case UPDATE_ENDORSEMENT_FORM:
      return {...state, ...action.data};
    default:
      return state;
  }
}
