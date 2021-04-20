import React from 'react';
import { Container } from '@material-ui/core';
import { ARIA_LABEL } from 'unions/test/aria-label';

const Garbage = () => {
  return (
    <Container aria-label={ARIA_LABEL.GARBAGE}>
      <h1>garbage</h1>
    </Container>
  );
};

export default Garbage;
