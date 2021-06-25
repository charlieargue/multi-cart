// thx: https://storybook.js.org/addons/storybook-addon-next-router
import { List, StylesProvider } from '@chakra-ui/react';
import React from 'react';
import { FaRegListAlt as ProductsIcon } from 'react-icons/fa';
import { withNextRouter } from 'storybook-addon-next-router';
import { SideBarItem, SideBarItemProps, SideBarItemType } from '../../..';

export default {
  component: SideBarItem,
  title: 'SideBarItem',
  decorators: [withNextRouter],
};

const clickFn = () => alert('Clicked');

export const withNotCurrent = () => {
  const props: SideBarItemProps = {
    item: { name: "Products", icon: ProductsIcon, href: "/products", onClick: clickFn } as SideBarItemType,
    isCurrent: false
  };

  // NOTE: needed StylesProvider suddenly because of SideBarItem.stories.error: 
  // 🔴 useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` 
  return <StylesProvider value={{ ".rule": { textAlign: "left" } }}>
    <List spacing={2} ml={3}>
      <SideBarItem item={props.item} isCurrent={props.isCurrent} />
    </List>
  </StylesProvider>;
};


export const withCurrent = () => {
  const props: SideBarItemProps = {
    item: { name: "Products", icon: ProductsIcon, href: "/products", onClick: clickFn } as SideBarItemType,
    isCurrent: true
  };

  // NOTE: needed StylesProvider suddenly because of SideBarItem.stories.error: 
  // 🔴 useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` 
  return <StylesProvider value={{ ".rule": { textAlign: "left" } }}>
    <List spacing={2} ml={3}>
      <SideBarItem item={props.item} isCurrent={props.isCurrent} />
    </List>
  </StylesProvider>;
};

