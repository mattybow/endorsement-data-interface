import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/app';
import TweetTab from './components/tweetTab';
import CandidateTab from './components/candidateTab';
import EndorserTab from './components/endorserTab';
import EndorsementsTab from './components/endorsementsTab';
import TagsTab from './components/tagsTab';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TweetTab}/>
    <Route path="/tweets" component={TweetTab}></Route>
    <Route path="/candidates" component={CandidateTab}></Route>
    <Route path="/endorsers" component={EndorserTab}></Route>
    <Route path="/endorsements" component={EndorsementsTab}></Route>
    <Route path="/tags" component={TagsTab}></Route>
  </Route>
);
