// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
// css
import './index.css';
// components
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Team from './components/Team'
// import NotFound from './components/NotFound'

const history = createHistory()

const routes = () => (
  <Router history={history}>
    <App />
  </Router>
)

// <Miss component={NotFound}></Miss>
ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
