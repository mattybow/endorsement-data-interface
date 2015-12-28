import axios from 'axios';

export function getTweets(){
  return axios.get('/api/data');
}

export function deleteTweet(id){
  return axios.post('/api/deleteTweet', {
    id
  });
}

export function checkAuth(){
  return axios.post('/auth/check');
}
