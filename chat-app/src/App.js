import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './theme';

import LoginForm from './component/auth/LoginForm';
import RegisterForm from './component/auth/RegisterForm';
import Dashboard from './component/layout/Dashboard';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
