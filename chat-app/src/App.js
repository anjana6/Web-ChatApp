import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';


import LoginForm from './component/auth/LoginForm';
import RegisterForm from './component/auth/RegisterForm';
import Dashboard from './component/layout/Dashboard';

function App() {
  return (
    <div>
     <CssBaseline/>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
