import React from 'react';
import {render} from 'react-dom';
import ResourcePlans from './components/ResourcePlans';
import ResourcePlanStore from './stores/ResourcePlanStore';

let data = ResourcePlanStore.getAll();

render(
  <ResourcePlans data={data} startDate={new Date()}/>,
  document.getElementsByClassName('rp-resource-plans')[0]
);
