import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { createTheme } from 'consts/theme';

const Analytics = () => {
  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <React.Fragment>
        <h1>analytics</h1>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Analytics;
