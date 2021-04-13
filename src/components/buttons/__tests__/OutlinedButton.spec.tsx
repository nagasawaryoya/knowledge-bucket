import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { OutlinedButton } from '../OutlinedButton';
import { ARIA_LABEL } from '../../../unions/test/aria-label';

const onClick = jest.fn();

describe('OutlinedButtonコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<OutlinedButton label="テスト" />);
    expect(screen.getByLabelText(ARIA_LABEL.OUTLINED_BUTTON)).toBeInTheDocument();
  });

  it('クリックイベントが発火することをテストする', () => {
    render(<OutlinedButton label="テスト" onClick={onClick} />);
    const button = screen.getByLabelText(ARIA_LABEL.OUTLINED_BUTTON);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
