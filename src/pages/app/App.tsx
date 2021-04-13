import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { IconButton } from 'components/buttons/IconButton';
import { ContainedButton } from 'components/buttons/ContainedButton';
import { OutlinedButton } from 'components/buttons/OutlinedButton';
import { Dialog } from 'components/layouts/Dialog';
import { InputText } from 'components/inputs/InputText';
import { COLOR } from 'unions/ui-theme/color';
import { ICON_NAME } from 'unions/icon-name';
import { THEME_TYPE } from 'unions/ui-theme/theme-type';
import { VALIDATE_TYPE } from 'unions/validate-type';
import { createTheme } from 'consts/theme';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string | number>('');
  const onChangeValue = (value: string | number): void => {
    setInputValue(value);
  };
  console.log(typeof inputValue);
  console.log(inputValue);
  return (
    <ThemeProvider theme={createTheme(THEME_TYPE.DARK)}>
      <CssBaseline />
      <React.Fragment>
        <IconButton icon={{ name: ICON_NAME.ADD }} onClick={test3} />
        <IconButton icon={{ name: ICON_NAME.ADD }} style={{ hoverColor: COLOR.GREEN.MAIN }} />
        <ContainedButton label="作成" style={{ backgroundColor: COLOR.GREEN.MAIN }} />
        <ContainedButton label="作成" onClick={test1} />
        <OutlinedButton label="キャンセル" onClick={test2} />
        <Dialog open={false} title="タイトルですよ" text="テキストテキスト" />
        <InputText
          input={{ variant: 'outlined' }}
          validate={{ required: true, type: VALIDATE_TYPE.NUMBER, range: { start: 0, end: 10 } }}
          onChangeValue={onChangeValue}
        ></InputText>
      </React.Fragment>
    </ThemeProvider>
  );
}

const test1 = () => {
  console.log('テスト1');
};
const test2 = () => {
  console.log('テスト2');
};
const test3 = () => {
  console.log('テスト3');
};

export default App;
