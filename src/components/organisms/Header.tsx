import React from 'react';
import { ARIA_LABEL } from 'unions/test/aria-label';

const Header = () => {
  return <div aria-label={ARIA_LABEL.HEADER}>ヘッダー仮</div>;
};

export default Header;
