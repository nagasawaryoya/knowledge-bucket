import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InputText } from '../InputText';
import { ARIA_LABEL } from '../../../unions/test/aria-label';

const onChangeValue = jest.fn();

describe('InputTextコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<InputText />);
    expect(screen.getByLabelText(ARIA_LABEL.INPUT_TEXT).querySelector('input')).toBeInTheDocument();
  });

  it('入力値がバリュー値になることをテストする', () => {
    const testText = 'test';

    render(<InputText />);
    const input = screen.getByLabelText(ARIA_LABEL.INPUT_TEXT).querySelector('input');

    // デフォルトは空であることを確認
    expect(input.value).toBe('');

    // テキスト入力
    fireEvent.change(input, {
      target: { value: testText },
    });

    // 入力値が input-text のバリュー値になったことを確認
    expect(input.value).toBe(testText);
  });

  it('入力イベント発火時に props で渡された onChangeValue() が実行されることをテストする', () => {
    const testText = 'test';

    render(<InputText onChangeValue={onChangeValue} />);
    const input = screen.getByLabelText(ARIA_LABEL.INPUT_TEXT).querySelector('input');

    // テキスト入力
    fireEvent.change(input, {
      target: { value: testText },
    });

    expect(onChangeValue).toHaveBeenCalledTimes(1);
  });
});
