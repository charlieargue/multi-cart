import React from 'react';
import { Breadcrumbs, BreadcrumbsProps, BreadcrumbLink } from './Breadcrumbs';

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
      href:"/cart",
      as:"/cart"
    }]
  };

  return <Breadcrumbs {...props} />;
};

// -------------------
export const withMultipleLinks = () => {
  /* eslint-disable-next-line */
  const props: BreadcrumbsProps = {
    links: [{
      isActive: true,
      label: "Carts",
      href:"/carts",
      as:"/carts"
    },
    {
      isActive: false,
      label: "Cart",
      id: 5,
      href:"/cart",
      as:"/cart"
    }]
  };

  return <Breadcrumbs {...props} />;
};

