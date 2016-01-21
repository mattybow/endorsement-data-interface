import { UPDATE_ENDORSEMENT_FORM,
         ADD_ENDORSER,
         UPDATE_ENDORSER,
         REMOVE_ENDORSER,
         UPDATE_ENDORSER_TAGS,
         CLEAR_ENDORSEMENT_FORM } from '../constants/endorsementFormTypes';

function makeEmptyEndorser(){
  return {
    NAME:null,
    DESCRIPT: null,
    WIKI_LINK: null,
    IS_ORG: false,
    END_ID:new Date().valueOf().toString(),
    AVATAR:null
  }
}

function getInitialState(){
  return {
    selectedCandidate:'',
    endorsers:[
      makeEmptyEndorser()
    ],
    selectedTags:[],
    source:null
  }
}

export default function endorsementFormData(state=getInitialState(), action){
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
      return {...state, ...{endorsers:state.endorsers.filter( endorser => endorser.END_ID !== action.id )}};
    case UPDATE_ENDORSER_TAGS:
      const {tag, selected} = action;
      console.log('ADD SELECTED TAG',tag)
      if(selected){
        return {...state, selectedTags:[...state.selectedTags, {...tag, isSelected:selected}]}
      } else {
        return {...state, selectedTags: state.selectedTags.filter( selectedTag => tag.id !== selectedTag.id)};
      }
    case CLEAR_ENDORSEMENT_FORM:
      return getInitialState();
    default:
      return state;
  }
}
