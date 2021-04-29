import React from 'react';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import Md from 'components/organisms/Md';
import { ARIA_LABEL } from 'unions/test/aria-label';

const Home = React.memo(() => {
  const classes = useStyles();
  return (
    <Container aria-label={ARIA_LABEL.HOME} className={classes.root}>
      <Md />
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
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export default Home;
