import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListItemLink } from '../ListItemLink';
import { ARIA_LABEL } from '../../../unions/test/aria-label';

describe('ListItemLinkコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<ListItemLink />);
    expect(screen.getByLabelText(ARIA_LABEL.LIST_ITEM_LINK)).toBeInTheDocument();
  });

  it('コンポーネントが存在することをチェックする', () => {
    render(<ListItemLink />);
    expect(screen.getByLabelText(ARIA_LABEL.LIST_ITEM_LINK)).toBeInTheDocument();
  });

  it('コンポーネントがaタグとして描画されることをチェックする', () => {
    render(<ListItemLink />);
    expect(screen.getByLabelText(ARIA_LABEL.LIST_ITEM_LINK).tagName).toStrictEqual('A');
  });

  it('propsで与えられたhrefが属性として追加されていることをチェックする', () => {
    const href = '/test';
    render(<ListItemLink href={href} />);
    expect(screen.getByLabelText(ARIA_LABEL.LIST_ITEM_LINK).getAttribute('href')).toStrictEqual(href);
  });
});
