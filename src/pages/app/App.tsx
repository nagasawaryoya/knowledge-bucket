import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IconButton } from 'components/buttons/IconButton';
import { Button } from 'components/buttons/Button';
import { ICON_NAME } from 'unions/icon-name';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { COLOR_CODE } from 'unions/ui-theme/color-code';
import { createTheme } from 'consts/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <div>
        <IconButton icon={{name: ICON_NAME.ADD, color: COLOR_CODE.PRIMARY}} />
        <Button label='create' button={{color: COLOR_CODE.PRIMARY}} />
      </div>
    </ThemeProvider>
  )
}

export default App;
