import { UPDATE_ENDORSEMENT_FORM, ADD_ENDORSER, UPDATE_ENDORSER, REMOVE_ENDORSER } from '../constants/endorsementFormTypes';

export function updateEndorsementForm(data){
  return {
    type:UPDATE_ENDORSEMENT_FORM,
    data
  };
}

export function updateEndorser(id, data){
  return {
    type:UPDATE_ENDORSER,
    id,
    data
  }
}

export function removeEndorser(id){
  return {
    type:REMOVE_ENDORSER,
    id
  }
}

export function addEndorser(){
  return {
    type:ADD_ENDORSER
  };
}
