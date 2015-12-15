import axios from 'axios';

export function getTweets(){
  return axios.get('/api/data');
}
