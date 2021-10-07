import React, { FC, useMemo, useState } from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemLink } from 'components/atoms/ListItemLink';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { SIDEBAR } from 'unions/ui-theme/style';
import { PERCENT } from 'unions/ui-theme/unit';
import { useMediaQueryBase } from 'utils/hooks/useMediaQueryBase';
import { SIDEBAR_ITEMS } from 'consts/sidebar-items';

type SidebarProps = {
  openEvent: boolean;
  // eslint-disable-next-line no-unused-vars
  toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

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

const Sidebar: FC<SidebarProps> = React.memo(({ openEvent, toggleDrawer }) => {
  const matches = useMediaQueryBase();
  const [open, setOpen] = useState(false);

  useMemo(() => {
    setOpen(openEvent);
  }, [openEvent]);

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
});

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root'>} cssプロパティ
 */
const useStyles = makeStyles({
  root: {
    width: SIDEBAR.WIDTH,
    height: PERCENT(100),
  },
});

export default Sidebar;
