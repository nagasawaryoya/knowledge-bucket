import { RouterPath, ROUTER_PATH } from 'unions/router-path';

type SidebarItem = {
  title: string;
  router: RouterPath;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'ノート',
    router: ROUTER_PATH.HOME,
  },
  {
    title: 'ワードクラウド',
    router: ROUTER_PATH.WORD_CLOUD,
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
