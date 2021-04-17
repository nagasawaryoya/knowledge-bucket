import React from 'react';
import { ListItem, ListItemProps } from '@material-ui/core';

export const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem button component="a" {...props} />;
};
