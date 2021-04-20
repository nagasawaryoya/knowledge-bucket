import React, { useState } from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItemLink } from 'components/atoms/ListItemLink';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { SIDEBAR } from 'unions/ui-theme/style';
import { useMediaQueryBase } from 'utils/hooks/useMediaQueryBase';
import { SIDEBAR_ITEMS } from 'consts/sidebar-items';

const SidebarList = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItemText>ロゴ</ListItemText>
      {SIDEBAR_ITEMS.map((item, i) => (
        <ListItemLink aria-label={ARIA_LABEL.SIDEBAR_ITEM} button href={item.router} key={i}>
          <ListItemText primary={item.title} />
        </ListItemLink>
      ))}
    </List>
  );
};

const Sidebar = () => {
  const matches = useMediaQueryBase();

  const [open, setOpen] = useState(true);
  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <React.Fragment>
      <Drawer
        aria-label={ARIA_LABEL.SIDEBAR}
        anchor="left"
        variant={matches ? 'permanent' : 'temporary'}
        open={open}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <SidebarList />
      </Drawer>
    </React.Fragment>
  );
};

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root'>} cssプロパティ
 */
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: SIDEBAR.WIDTH,
      height: '100%',
    },
  }),
);

export default Sidebar;
