import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { IconButton } from '../IconButton';
import { ICON_NAME } from '../../../../unions/icon-name';
import { ARIA_LABEL } from '../../../../unions/test/aria-label';

const onClick = jest.fn();

describe('IconButtonコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<IconButton icon={{ name: ICON_NAME.ADD }} />);
    expect(screen.getByLabelText(ARIA_LABEL.ICON_BUTTON)).toBeInTheDocument();
  });

  it('クリックイベントが発火することをテストする', () => {
    render(<IconButton icon={{ name: ICON_NAME.ADD }} onClick={onClick} />);
    const button = screen.getByLabelText(ARIA_LABEL.ICON_BUTTON);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
