import React from 'react';
import ReactMarkdown from 'react-markdown';

const text = `
# Hello World！

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

const Md = () => {
  return <ReactMarkdown children={text}></ReactMarkdown>;
};

export default Md;
