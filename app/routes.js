import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import TweetList from './components/tweetList';

class Cray extends React.Component{
  render(){
    return <h2>HAHAHHAHA</h2>;
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TweetList}/>
    <Route path="/tweets" component={TweetList}></Route>
    <Route path="/candidates" component={Cray}></Route>
    <Route path="/endorsers" component={Cray}></Route>
    <Route path="/endorsements" component={Cray}></Route>
    <Route path="/tags" component={Cray}></Route>
  </Route>
);
