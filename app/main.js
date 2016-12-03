import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router';
import App from './components/app/App';

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementsByClassName('rp-app')[0]
);
