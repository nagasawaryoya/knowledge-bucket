import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { IconButton } from 'components/atoms/buttons/IconButton';
import { ContainedButton } from 'components/atoms/buttons/ContainedButton';
import { OutlinedButton } from 'components/atoms/buttons/OutlinedButton';
import { Dialog } from 'components/organisms/Dialog';
import { InputText } from 'components/atoms/inputs/InputText';
import { InputTextarea } from 'components/atoms/inputs/InputTextarea';
import { COLOR } from 'unions/ui-theme/color';
import { ICON_NAME } from 'unions/icon-name';
import { VALIDATE_TYPE } from 'unions/validate-type';
import { ARIA_LABEL } from 'unions/test/aria-label';

const Home = () => {
  const [inputValue, setInputValue] = useState<string | number>('');
  const onChangeValue = (value: string | number): void => {
    setInputValue(value);
  };
  // TODO 消す
  console.log(typeof inputValue);
  console.log(inputValue);
  return (
    <Container aria-label={ARIA_LABEL.HOME}>
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
      <br />
      <InputTextarea input={{ rowsMin: 5 }} />
    </Container>
  );
};

const test1 = () => {
  console.log('テスト1');
};
const test2 = () => {
  console.log('テスト2');
};
const test3 = () => {
  console.log('テスト3');
};

export default Home;
