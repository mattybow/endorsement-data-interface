import { UPDATE_ENDORSEMENT_FORM } from '../constants/endorsementFormTypes';

export function updateEndorsementForm(data){
  return {
    type:UPDATE_ENDORSEMENT_FORM,
    data
  };
}
