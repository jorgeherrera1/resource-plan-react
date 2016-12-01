import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import App from './components/app/App';
import ResourcePlans from './components/resource-plans-table/ResourcePlans';
import AllocationByMonth from './components/charts/AllocationByMonth';

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/worksheet" />
      <Route path="/worksheet" component={ResourcePlans} />
      <Route path="/monthly" component={AllocationByMonth} />
    </Route>
  </Router>,
  document.getElementsByClassName('rp-app')[0]
);
