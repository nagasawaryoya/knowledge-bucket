import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Home from 'pages/Home';
import WordCloud from 'pages/WordCloud';
import Analytics from 'pages/Analytics';
import Garbage from 'pages/Garbage';
import Header from 'components/organisms/Header';
import Sidebar from 'components/organisms/Sidebar';
import { ROUTER_PATH } from 'unions/router-path';
import { BREAKPOINT, SIDEBAR, HEADER } from 'unions/ui-theme/style';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { createTheme } from 'consts/theme';

const App = () => {
  const classes = useStyles();
  const [openEvent, setOpenEvent] = useState(false);

  const onClickMenu = () => {
    setOpenEvent(true);
  };

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenEvent(isOpen);
  };

  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <Sidebar openEvent={openEvent} toggleDrawer={toggleDrawer} />
      <Header onClickMenu={onClickMenu} />
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route path={ROUTER_PATH.WORD_CLOUD}>
              <WordCloud />
            </Route>
            <Route path={ROUTER_PATH.ANALYTICS}>
              <Analytics />
            </Route>
            <Route path={ROUTER_PATH.GARBAGE}>
              <Garbage />
            </Route>
            <Route path={ROUTER_PATH.HOME}>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root'>} cssプロパティ
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: `calc(100% - ${HEADER.HEIGHT}px)`,
      marginTop: HEADER.HEIGHT,
      float: 'right',
      padding: 20,
      [theme.breakpoints.down(BREAKPOINT.BASE)]: {
        width: '100%',
        flexShrink: 0,
      },
      [theme.breakpoints.up(BREAKPOINT.BASE)]: {
        width: `calc(100% - ${SIDEBAR.WIDTH}px)`,
      },
    },
  }),
);

export default App;
