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
  return <Breadcrumbs />;
};

// -------------------
export const withOneLink = () => {
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

