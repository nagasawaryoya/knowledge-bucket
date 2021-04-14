import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Main from 'pages/main/Main';
import Analytics from 'pages/analytics/Analytics';
import { ROUTER_PATH } from 'unions/router-path';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { createTheme } from 'consts/theme';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path={ROUTER_PATH.ANALYTICS}>
            <Analytics />
          </Route>
          <Route path={ROUTER_PATH.BASE}>
            <Main />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
