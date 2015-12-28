import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import TweetTab from './components/tweetTab';

class Cray extends React.Component{
  render(){
    return <h2>HAHAHHAHA</h2>;
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TweetTab}/>
    <Route path="/tweets" component={TweetTab}></Route>
    <Route path="/candidates" component={Cray}></Route>
    <Route path="/endorsers" component={Cray}></Route>
    <Route path="/endorsements" component={Cray}></Route>
    <Route path="/tags" component={Cray}></Route>
  </Route>
);
