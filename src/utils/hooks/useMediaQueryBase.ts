import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { BREAKPOINT } from 'unions/ui-theme/style';

export const useMediaQueryBase = (isDown?: boolean) => {
  const theme = useTheme();
  if (isDown) {
    return useMediaQuery(theme.breakpoints.down(BREAKPOINT.BASE));
  }
  return useMediaQuery(theme.breakpoints.up(BREAKPOINT.BASE));
};
