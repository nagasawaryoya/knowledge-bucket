import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';
import { ICON_NAME } from '../../unions/icon-name';
import { ARIA_LABEL } from '../../unions/test/aria-label';

describe('Iconコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<Icon name={ICON_NAME.ADD} />);
    expect(screen.getByLabelText(ARIA_LABEL.ICON)).toBeInTheDocument();
  });
});
