import React from 'react';
import { AppBar } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from 'components/atoms/buttons/IconButton';
import { ICON_NAME } from 'unions/icon-name';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { BREAKPOINT, HEADER, SIDEBAR, ICON } from 'unions/ui-theme/style';

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar aria-label={ARIA_LABEL.HEADER} className={classes.root}>
      <IconButton
        icon={{ name: ICON_NAME.MENU, fontSize: 'large' }}
        style={{ size: ICON.L, borderStyle: 'none', hoverColor: '' }}
      />
    </AppBar>
  );
};

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root'>} cssプロパティ
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: HEADER.HEIGHT,
      [theme.breakpoints.down(BREAKPOINT.BASE)]: {
        width: `100%`,
      },
      [theme.breakpoints.up(BREAKPOINT.BASE)]: {
        width: `calc(100% - ${SIDEBAR.WIDTH}px)`,
      },
    },
  }),
);

export default Header;
