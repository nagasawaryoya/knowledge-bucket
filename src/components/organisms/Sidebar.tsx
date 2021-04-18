import React, { useState } from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ListItemLink } from 'components/atoms/ListItemLink';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { BREAKPOINT, SIDEBAR } from 'unions/ui-theme/style';
import { SIDEBAR_LIST } from 'consts/sidebar-items';

const SidebarList = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItemText>ロゴ</ListItemText>
      {SIDEBAR_LIST.map((item, i) => (
        <ListItemLink button href={item.router} key={i}>
          <ListItemText primary={item.title} />
        </ListItemLink>
      ))}
    </List>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(BREAKPOINT.BASE));

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
 * @returns {ClassNameMap<"root">} cssプロパティ
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
