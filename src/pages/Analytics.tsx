import React from 'react';
import { Container } from '@material-ui/core';
import { ARIA_LABEL } from 'unions/test/aria-label';

const Analytics = () => {
  return (
    <Container aria-label={ARIA_LABEL.ANALYTICS}>
      <h1>analytics</h1>
    </Container>
  );
};

export default Analytics;
