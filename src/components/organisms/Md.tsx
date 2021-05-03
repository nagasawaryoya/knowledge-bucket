import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

type MdProps = {
  children?: string;
};

const Md: FC<MdProps> = ({ children }) => {
  return <ReactMarkdown children={children ?? ''}></ReactMarkdown>;
};

export default Md;
