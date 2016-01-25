import axios from 'axios';

export function getTweets(){
  return axios.get('/api/tweets');
}

export function deleteTweet(id){
  return axios.post('/api/deleteTweet', {
    id
  });
}

export function addCandidate(data){
  return axios.post('/api/addCandidate',data);
}

export function addEndorsements(data){
  return axios.post('/api/addEndorsements',data);
}

export function saveEndorsementEdits(data){
  return axios.post('/api/updateEndorsement',data);
}

export function checkAuth(){
  return axios.post('/auth/check');
}

export function getCandidates(){
  return axios.get('/api/candidates');
}

export function getEndorsements(){
  return axios.get('/api/endorsements');
}

export function getEndorsers(){
  return axios.get('/api/endorsers');
}

export function getTags(){
  return axios.get('/api/tags');
}

export function getCandidateInfo(id){
  return axios.get('/api/candidate');
}
