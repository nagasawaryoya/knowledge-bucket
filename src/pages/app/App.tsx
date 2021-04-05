import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IconButton } from 'components/buttons/IconButton';
import { ContainedButton } from 'components/buttons/ContainedButton';
import { Dialog } from 'components/layouts/Dialog';
import { InputText } from 'components/inputs/InputText';
import { COLOR } from 'unions/ui-theme/color';
import { ICON_NAME } from 'unions/icon-name';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { createTheme } from 'consts/theme';
import { OutlinedButton } from 'components/buttons/OutlinedButton';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <React.Fragment>
        <IconButton icon={{ name: ICON_NAME.ADD }} />
        <IconButton icon={{ name: ICON_NAME.ADD }} style={{ hoverColor: COLOR.GREEN.MAIN }} />
        <ContainedButton label="作成" style={{ backgroundColor: COLOR.GREEN.MAIN }} />
        <ContainedButton label="作成" />
        <OutlinedButton label="キャンセル" />
        <Dialog open={false} title="タイトルですよ" text="テキストテキスト" />
        <InputText></InputText>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
