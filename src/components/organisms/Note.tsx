import React, { ChangeEvent, useMemo, useState } from 'react';
// import { createStyles, makeStyles } from '@material-ui/core';
import Md from 'components/organisms/Md';
import { InputTextarea } from 'components/atoms/inputs/InputTextarea';
import { useMediaQueryBase } from 'utils/hooks/useMediaQueryBase';
import VscodeKeyboardEvent, {
  KeyEvent,
  VscodeKeyboardEventResponse,
} from 'utils/application-util/vscode-keyboard-event';

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

  const onKeyDownHandler = (e: KeyEvent) => {
    const handle = keyEventHandle(e);
    if (handle) {
      handle
        .then((res) => {
          setInputState(res.text);
          return res.range;
        })
        .then((range) => {
          if (range) {
            e.target.setSelectionRange(range.start, range.end);
          }
        });
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

const keyEventHandle = (e: KeyEvent): Promise<VscodeKeyboardEventResponse> | undefined => {
  const vscodeKeyEvent = new VscodeKeyboardEvent(e);

  switch (e.key) {
    case 'Enter':
      e.preventDefault();
      return vscodeKeyEvent.enter();

    case 'Tab':
      if (e.keyCode !== 229) {
        e.preventDefault();
        return e.shiftKey ? vscodeKeyEvent.tabAndShift() : vscodeKeyEvent.tab();
      }
      return;

    default:
      return;
  }
};

export default Note;
