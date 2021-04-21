import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';


import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/dashboard.scss?v=1.2.0'
import 'assets/style/styles.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import AdminLayout from 'layouts/Admin.js';
import Landing from 'components/landingPage';
import Login from 'components/Auth/Login';
import { Provider } from 'react-redux';
import Register from 'components/Auth/Register';
import PrivateRoute from './private-route/privateroute';

const hist = createBrowserHistory();

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = './login';
  }
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Switch>
        <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
