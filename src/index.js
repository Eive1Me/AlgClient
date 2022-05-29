import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {  BrowserRouter as Router} from "react-router-dom";
import {createBrowserHistory} from 'history'
import store from './store/store'
import { Provider } from 'react-redux'

const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
      <Router history={history}>
          <Provider store={store}>
            <App />
          </Provider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);