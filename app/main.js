import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router';
import App from './components/app/App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementsByClassName('rp-app')[0]
);
