import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from 'components/organisms/Header';
import Sidebar from 'components/organisms/Sidebar';
import Main from 'pages/main/Main';
import Analytics from 'pages/analytics/Analytics';
import { ROUTER_PATH } from 'unions/router-path';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { createTheme } from 'consts/theme';
import Hamburger from 'components/organisms/Hamburger';

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <Header />
      <div className={classes.root}>
        <Sidebar />
        <Hamburger />
        <div className={classes.content}>
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
        </div>
      </div>
    </ThemeProvider>
  );
};

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root' | 'content'>} cssプロパティ
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    content: {
      height: '100%',
      float: 'right',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexShrink: 0,
      },
    },
  }),
);

export default App;
