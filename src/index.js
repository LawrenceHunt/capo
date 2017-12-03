// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
// css
import './styles/style.css';
// components
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';


const Routes = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(Routes, document.getElementById('root'));
registerServiceWorker();
