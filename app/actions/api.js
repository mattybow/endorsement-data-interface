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

export function checkAuth(){
  return axios.post('/auth/check');
}

export function getCandidates(){
  return axios.get('/api/candidates');
}

export function getCandidateInfo(id){
  return axios.get('/api/candidate');
}
