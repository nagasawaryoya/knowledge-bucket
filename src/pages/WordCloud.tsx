import React from 'react';
import { Container } from '@material-ui/core';
import { ARIA_LABEL } from 'unions/test/aria-label';

const WordCloud = () => {
  return (
    <Container aria-label={ARIA_LABEL.WORD_CLOUD}>
      <h1>word cloud</h1>
    </Container>
  );
};

export default WordCloud;
