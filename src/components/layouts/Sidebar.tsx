import React from 'react';
import { List, ListItemText } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItemLink } from 'components/layouts/ListItemLink';
import { RouterPath, ROUTER_PATH } from 'unions/router-path';
import { COLOR } from 'unions/ui-theme/color';
import { BORDER } from 'unions/ui-theme/style';

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

export const Sidebar = () => {
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

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<"root">} cssプロパティ
 */
const useStyles = (): ClassNameMap<'root'> => {
  return makeStyles(() =>
    createStyles({
      root: {
        width: '14%',
        height: '100%',
        borderRight: 'solid',
        borderWidth: BORDER.WIDTH.S,
        borderColor: COLOR.GREY.MAIN,
      },
    }),
  )();
};
