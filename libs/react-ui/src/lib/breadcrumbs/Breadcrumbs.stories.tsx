import { Badge, Divider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Wrapper } from '../wrapper/Wrapper';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs',
};


// -------------------
export const withDefaultState = () => {
  /* eslint-disable-next-line */
  return <Breadcrumbs />;
};

// -------------------
export const withOneLink = () => {
  /* eslint-disable-next-line */
  const props: BreadcrumbsProps = {
    links: [{
      isActive: true,
      label: "Cart",
      id: 5,
      href: "/cart",
      as: "/cart"
    }]
  };

  return <Breadcrumbs {...props} />;
};

// -------------------
export const withMultipleLinks = () => {
  /* eslint-disable-next-line */
  const props: BreadcrumbsProps = {
    links: [{
      isActive: false,
      label: "Carts",
      href: "/carts",
      as: "/carts"
    },
    {
      isActive: true,
      label: "Cart",
      id: 5,
      href: "/cart",
      as: "/cart"
    }]
  };

  return <Breadcrumbs {...props} />;
};

