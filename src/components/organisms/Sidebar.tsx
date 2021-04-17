import React from 'react';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItemLink } from 'components/atoms/ListItemLink';
import { RouterPath, ROUTER_PATH } from 'unions/router-path';
import { COLOR } from 'unions/ui-theme/color';
import { BORDER } from 'unions/ui-theme/style';
import { ARIA_LABEL } from 'unions/test/aria-label';

type SidebarItem = {
  title: string;
  router: RouterPath;
};

const list: SidebarItem[] = [
  {
    title: 'ノート',
    router: ROUTER_PATH.BASE,
  },
  {
    title: 'ワードクラウド',
    router: ROUTER_PATH.ANALYTICS,
  },
  {
    title: '分析',
    router: ROUTER_PATH.ANALYTICS,
  },
  {
    title: 'ゴミ箱',
    router: ROUTER_PATH.ANALYTICS,
  },
];

const SidebarList = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {list.map((item, i) => (
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
      <Drawer aria-label={ARIA_LABEL.SIDEBAR} anchor="left" variant="permanent" open={true} PaperProps={{}}>
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
const useStyles = (): ClassNameMap<'root'> => {
  // const currentTheme = useTheme();

  return makeStyles(() =>
    createStyles({
      root: {
        width: '100%',
        height: '100%',
        borderRight: 'solid',
        borderWidth: BORDER.WIDTH.S,
        borderColor: COLOR.GREY.MAIN,
        // [currentTheme.breakpoints.up('sm')]: {
        //   display: 'none',
        //   flexShrink: 0,
        // },
      },
    }),
  )();
};

export default Sidebar;
