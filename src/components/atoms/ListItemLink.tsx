import React from 'react';
import { ListItem, ListItemProps } from '@material-ui/core';
import { ARIA_LABEL } from 'unions/test/aria-label';

export const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem aria-label={ARIA_LABEL.LIST_ITEM_LINK} button component="a" {...props} />;
};
