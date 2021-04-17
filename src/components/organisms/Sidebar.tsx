import React, { useState } from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItemLink } from 'components/atoms/ListItemLink';
import { ARIA_LABEL } from 'unions/test/aria-label';
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
  const drawer = document.body.clientWidth > 820;

  const [state, setState] = useState(true);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return (
    <React.Fragment>
      <Drawer
        aria-label={ARIA_LABEL.SIDEBAR}
        anchor="left"
        variant={drawer ? 'permanent' : 'temporary'}
        open={state}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        PaperProps={{ style: { top: 'unset' } }}
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
      width: '100%',
      height: '100%',
    },
  }),
);

export default Sidebar;
