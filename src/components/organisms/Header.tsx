import React from 'react';
import { AppBar } from '@material-ui/core';
import { IconButton } from 'components/atoms/buttons/IconButton';
import { ICON_NAME } from 'unions/icon-name';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { ICON } from 'unions/ui-theme/style';

const Header = () => {
  return (
    <AppBar aria-label={ARIA_LABEL.HEADER}>
      <IconButton
        icon={{ name: ICON_NAME.MENU, fontSize: 'large' }}
        style={{ size: ICON.L, borderStyle: 'none', hoverColor: '' }}
      />
    </AppBar>
  );
};

export default Header;
