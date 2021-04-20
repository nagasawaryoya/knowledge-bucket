import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { ARIA_LABEL } from '../../../unions/test/aria-label';

describe('Headerコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<Header />);
    expect(screen.getByLabelText(ARIA_LABEL.HEADER)).toBeInTheDocument();
  });
});
