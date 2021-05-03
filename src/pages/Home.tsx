import React from 'react';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import Note from 'components/organisms/Note';
import { ARIA_LABEL } from 'unions/test/aria-label';

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
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
    },
  }),
);

export default Home;
