import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ContainedButton } from '../ContainedButton';
import { ARIA_LABEL } from '../../../unions/test/aria-label';

const onClick = jest.fn();

describe('ContainedButtonコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<ContainedButton label="テスト" />);
    expect(screen.getByLabelText(ARIA_LABEL.CONTAIN_BUTTON)).toBeInTheDocument();
  });

  it('クリックイベントが発火することをテストする', () => {
    render(<ContainedButton label="テスト" onClick={onClick} />);
    const button = screen.getByLabelText(ARIA_LABEL.CONTAIN_BUTTON);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
