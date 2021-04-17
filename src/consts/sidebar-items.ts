import { RouterPath, ROUTER_PATH } from 'unions/router-path';

type SidebarItem = {
  title: string;
  router: RouterPath;
};

export const SIDEBAR_LIST: SidebarItem[] = [
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
