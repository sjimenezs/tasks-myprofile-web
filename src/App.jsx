import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import JobsFitView from './jobsfit/JobsFitView';
import HomeView from './home/HomeView';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/jobs">
          <JobsFitView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
}
