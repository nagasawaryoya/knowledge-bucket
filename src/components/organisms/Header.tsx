import React, { FC, MouseEventHandler } from 'react';
import { AppBar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from 'components/atoms/buttons/IconButton';
import { ICON_NAME } from 'unions/icon-name';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { BREAKPOINT, HEADER, SIDEBAR, ICON } from 'unions/ui-theme/style';
import { PERCENT, CALC, PX } from 'unions/ui-theme/unit';

type HeaderProps = {
  onClickMenu: MouseEventHandler;
};

const Header: FC<HeaderProps> = React.memo(({ onClickMenu }) => {
  const classes = useStyles();

  return (
    <AppBar aria-label={ARIA_LABEL.HEADER} className={classes.root}>
      <div className={classes.menuIcon}>
        <IconButton
          icon={{ name: ICON_NAME.MENU, fontSize: 'large' }}
          style={{ size: ICON.L, borderStyle: 'none', hoverColor: '' }}
          onClick={onClickMenu}
        />
      </div>
    </AppBar>
  );
});

/**
 * スタイルを適用する。
 *
 * @returns cssプロパティ
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: HEADER.HEIGHT,
    [theme.breakpoints.down(BREAKPOINT.BASE)]: {
      width: PERCENT(100),
    },
    [theme.breakpoints.up(BREAKPOINT.BASE)]: {
      width: CALC(PERCENT(100), '-', PX(SIDEBAR.WIDTH)),
    },
  },
  menuIcon: {
    [theme.breakpoints.down(BREAKPOINT.BASE)]: {
      display: 'block',
    },
    [theme.breakpoints.up(BREAKPOINT.BASE)]: {
      display: 'none',
    },
  },
}));

export default Header;
