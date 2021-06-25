// thx: https://storybook.js.org/addons/storybook-addon-next-router
import React from 'react';
import SideBar, { SideBarProps } from './SideBar';
import { withNextRouter } from 'storybook-addon-next-router';

export default {
  component: SideBar,
  title: 'SideBar',
  decorators: [withNextRouter],
};

export const primary = () => {
  const props: SideBarProps = {
    logoutFunction: () => alert('Logging Out')
  };
  return <SideBar logoutFunction={props.logoutFunction} />;
};

primary.parameters = {
  nextRouter: {
    path: '/profile/[id]',
    asPath: '/profile/lifeiscontent',
    query: {
      id: 'lifeiscontent',
    },
  },
};