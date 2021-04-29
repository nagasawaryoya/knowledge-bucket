import React from 'react';
import { Container } from '@material-ui/core';
import Md from 'components/organisms/Md';
import { ARIA_LABEL } from 'unions/test/aria-label';

const Home = React.memo(() => {
  return (
    <Container aria-label={ARIA_LABEL.HOME}>
      <Md />
    </Container>
  );
});

export default Home;
