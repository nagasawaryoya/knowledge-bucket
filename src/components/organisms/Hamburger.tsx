import React, { useState } from 'react';
import { Link, Menu, MenuItem } from '@material-ui/core';
import { IconButton } from 'components/atoms/buttons/IconButton';
import { ICON_NAME } from 'unions/icon-name';
import { ICON } from 'unions/ui-theme/style';
import { SIDEBAR_LIST } from 'consts/sidebar-items';

const ITEM_HEIGHT = 48;

const Hamburger = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton icon={{ name: ICON_NAME.MENU }} style={{ size: ICON.L }} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {SIDEBAR_LIST.map((item, i) => (
          <MenuItem key={i} onClick={handleClose}>
            <Link href={item.router}>{item.title}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Hamburger;
