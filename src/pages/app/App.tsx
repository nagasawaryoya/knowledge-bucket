import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IconButton } from 'components/buttons/IconButton';
import { Button } from 'components/buttons/Button';
import { Dialog } from 'components/layouts/Dialog';
import { InputText } from 'components/inputs/InputText';
import { ICON_NAME } from 'unions/icon-name';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { createTheme } from 'consts/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <React.Fragment>
        <IconButton icon={{ name: ICON_NAME.ADD }} />
        <Button label="作成" />
        <Dialog open={false} title="タイトルですよ" text="テキストテキスト" />
        <InputText></InputText>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
