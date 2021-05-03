import React, { ChangeEvent, useMemo, useState } from 'react';
// import { createStyles, makeStyles } from '@material-ui/core';
import Md from 'components/organisms/Md';
import { InputTextarea } from 'components/atoms/inputs/InputTextarea';
import { useMediaQueryBase } from 'utils/hooks/useMediaQueryBase';
import VscodeKeyboardEvent from 'utils/application-util/vscode-keyboard-event';

// const text = `
// # Hello World

// A paragraph with *emphasis* and **strong importance**.

// > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

// * Lists
// * [ ] todo
// * [x] done

// A table:

// | a | b |
// | - | - |
// `;

const Note = () => {
  const [inputState, setInputState] = useState('');
  const [rows, setRows] = useState(35);

  const matches = useMediaQueryBase();

  useMemo(() => {
    setRows(matches ? 35 : 28);
  }, [matches]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const onKeyDownHandler = (e: ChangeEvent<HTMLInputElement> & React.KeyboardEvent) => {
    // タイプしたキーがTabキーの時 かつ 日本語入力未確定状態でない時に実行する。
    if (e.key === 'Tab' && e.keyCode !== 229) {
      e.preventDefault();

      const vscodeKeyEvent = new VscodeKeyboardEvent(e);

      if (e.shiftKey) {
        vscodeKeyEvent
          .tabAndShift()
          .then((res) => {
            setInputState(res.text);
            return {
              ...res.range,
              change: res.isChange,
            };
          })
          .then((res) => {
            if (res.change) {
              e.target.setSelectionRange(res.start, res.end);
            }
          });
      } else {
        vscodeKeyEvent
          .tab()
          .then((res) => {
            setInputState(res.text);
            return res.range;
          })
          .then((res) => {
            e.target.setSelectionRange(res.start, res.end);
          });
      }
    }
  };

  return (
    <React.Fragment>
      <div>
        <Md children={inputState} />
      </div>
      <InputTextarea
        input={{ rowsMin: rows, rowsMax: rows, value: inputState }}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
    </React.Fragment>
  );
};

export default Note;
