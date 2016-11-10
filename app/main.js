import React from 'react';
import {render} from 'react-dom';
import ResourcePlans from './components/ResourcePlans';

render(
  <ResourcePlans startDate={new Date()}/>,
  document.getElementsByClassName('rp-resource-plans-container')[0]
);
