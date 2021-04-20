import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { ARIA_LABEL } from '../../../unions/test/aria-label';
import { SIDEBAR_ITEMS } from '../../../consts/sidebar-items';

describe('Sidebarコンポーネントのテスト', () => {
  it('コンポーネントが存在することをチェックする', () => {
    render(<Sidebar />);
    expect(screen.getByLabelText(ARIA_LABEL.SIDEBAR)).toBeInTheDocument();
  });

  it('静的表示項目が正しいことをチェックする', () => {
    render(<Sidebar />);
    SIDEBAR_ITEMS.map((item) => expect(screen.getByText(item.title)).toBeInTheDocument());
  });

  it('各項目に正しいhref属性が追加されていることをチェックする', () => {
    render(<Sidebar />);
    screen.getAllByLabelText(ARIA_LABEL.SIDEBAR_ITEM).map((itemDom, i) => {
      expect(itemDom.getAttribute('href')).toStrictEqual(SIDEBAR_ITEMS[i].router);
    });
  });
});
