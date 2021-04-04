import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IconButton } from 'components/buttons/IconButton';
import { Button } from 'components/buttons/Button';
import { Dialog } from 'components/layouts/Dialog';
import { InputText } from 'components/inputs/InputText';
import { COLOR } from 'unions/ui-theme/color';
import { BORDER, BUTTON } from 'unions/ui-theme/style';
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
        <Button
          label="作成"
          style={{
            width: BUTTON.WIDTH.L,
            backgroundColor: COLOR.GREEN.DARK,
            borderRadius: BORDER.RADIUS.C,
            borderColor: COLOR.RED.DARK,
            borderWidth: BORDER.WIDTH.M,
            borderStyle: 'solid',
          }}
        />
        <Dialog open={false} title="タイトルですよ" text="テキストテキスト" />
        <InputText></InputText>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
