import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputTextarea } from '../InputTextarea';
import { ARIA_LABEL } from '../../../unions/test/aria-label';

describe('InputTextareaコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<InputTextarea />);
    expect(screen.getByLabelText(ARIA_LABEL.INPUT_TEXTAREA)).toBeInTheDocument();
  });
});
