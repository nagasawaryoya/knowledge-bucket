import React from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ListItemLink } from 'components/atoms/ListItemLink';
import { COLOR } from 'unions/ui-theme/color';
import { BORDER } from 'unions/ui-theme/style';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { SIDEBAR_LIST } from 'consts/sidebar-items';

const SidebarList = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {SIDEBAR_LIST.map((item, i) => (
        <ListItemLink button href={item.router} key={i}>
          <ListItemText primary={item.title} />
        </ListItemLink>
      ))}
    </List>
  );
};

const Sidebar = () => {
  return (
    <React.Fragment>
      <Drawer
        aria-label={ARIA_LABEL.SIDEBAR}
        anchor="left"
        variant="permanent"
        open={true}
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
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      borderRight: 'solid',
      borderWidth: BORDER.WIDTH.S,
      borderColor: COLOR.GREY.MAIN,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
        flexShrink: 0,
      },
    },
  }),
);

export default Sidebar;
