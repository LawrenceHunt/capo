// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
// css
import './index.css';
// components
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Team from './components/Team'

const history = createHistory()

const Routes = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(Routes, document.getElementById('root'));
registerServiceWorker();
