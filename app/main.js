import React from 'react';
import {render} from 'react-dom';
import ResourcePlans from './components/ResourcePlans';

let data = [
  {id: 1, name: 'Jorge', allocations: [20, 40, 40, 40]},
  {id: 2, name: 'Emmanuel', allocations: [10, 10, 10, 10]}
];

render(
  <ResourcePlans data={data} startDate={new Date()}/>,
  document.getElementsByClassName('rp-resource-plans')[0]
);
