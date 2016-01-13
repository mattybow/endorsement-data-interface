import { UPDATE_ENDORSEMENT_FORM, ADD_ENDORSER, UPDATE_ENDORSER, REMOVE_ENDORSER } from '../constants/endorsementFormTypes';

function makeEmptyEndorser(){
  return {
    NAME:null,
    DESCRIPT: null,
    WIKI_LINK: null,
    IS_ORG: false,
    END_ID:new Date().valueOf().toString(),
  }
}

const initalState = {
  selectedCandidate:null,
  endorsers:[
    makeEmptyEndorser()
  ],
  selectedTags:[]
}

export default function endorsementFormData(state=initalState, action){
  switch(action.type){
    case UPDATE_ENDORSEMENT_FORM:
      return {...state, ...action.data};
    case ADD_ENDORSER:
      const { endorsers } = state;
      const newEndorsers = [makeEmptyEndorser(),...endorsers];
      return {...state, ...{endorsers:newEndorsers} };
    case UPDATE_ENDORSER:
      const { id, data } = action;
      const updatedEndorsers = state.endorsers.map(endorser =>
        endorser.END_ID === id ?
          {...endorser, ...data} :
          endorser
        );
      return {...state, ...{endorsers:updatedEndorsers}};
    case REMOVE_ENDORSER:
    console.log(action.id);
      return {...state, ...{endorsers:state.endorsers.filter( endorser => endorser.END_ID !== action.id )}}
    default:
      return state;
  }
}
