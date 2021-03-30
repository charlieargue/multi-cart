import React from 'react';
import { Container } from 'react-bootstrap';
import { Breadcrumbs, BreadcrumbsProps, BreadcrumbLink } from './Breadcrumbs';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs',
};


// -------------------
export const withDefaultState = () => {
  /* eslint-disable-next-line */
  return (<Container fluid className="mx-0 px-0">
    <Breadcrumbs /></Container>)
    ;
};

// -------------------
export const withOneLink = () => {
  /* eslint-disable-next-line */
  const props: BreadcrumbsProps = {
    links: [{
      isActive: true,
      label: "Cart",
      id: 5
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
    },
    {
      isActive: false,
      label: "Cart",
      id: 5
    }]
  };

  return <Breadcrumbs {...props} />;
};

