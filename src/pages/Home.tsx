import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Note from 'components/organisms/Note';
import { ARIA_LABEL } from 'unions/test/aria-label';
import { PERCENT } from 'unions/ui-theme/unit';

const Home = React.memo(() => {
  const classes = useStyles();

  return (
    <Container aria-label={ARIA_LABEL.HOME} className={classes.root}>
      <Note />
    </Container>
  );
});

/**
 * スタイルを適用する。
 *
 * @returns {ClassNameMap<'root' | 'editor' | 'preview'>} cssプロパティ
 */
const useStyles = makeStyles({
  root: {
    height: PERCENT(100),
    width: PERCENT(100),
  },
});

export default Home;
