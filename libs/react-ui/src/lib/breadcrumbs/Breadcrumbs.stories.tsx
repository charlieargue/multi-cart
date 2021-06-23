import { Badge, Divider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Wrapper } from '../wrapper/Wrapper';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs',
};

const BreadcrumbsWrapper = ({ children, title }: { children: ReactNode; title?: string; }) => (
  <Wrapper>
    {title && <p style={{ marginBottom: 10 }}>{title}</p>}
    <Divider mb={9} />
    <div style={{ marginBottom: 20, display: 'block' }}>
      {React.Children.map(children, (child) => (
        <div style={{ marginRight: 20 }}>{child}</div>
      ))}
    </div>
  </Wrapper>
);

// -------------------
export const withDefaultState = () => {
  /* eslint-disable-next-line */
  return <BreadcrumbsWrapper title="Default"><Breadcrumbs /></BreadcrumbsWrapper>;
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

  return <BreadcrumbsWrapper title="One Link">
    <Breadcrumbs {...props} />
    <Badge textTransform="none" mb={.5} color="pink" ml={2}>This works (is pink)</Badge>
    <Badge textTransform="none" mb={.5} colorScheme="pink" ml={2}>This doesn't work (where's the pink?)</Badge>
  </BreadcrumbsWrapper>;
};

// -------------------
export const withMultipleLinks = () => {
  /* eslint-disable-next-line */
  const props: BreadcrumbsProps = {
    links: [{
      isActive: true,
      label: "Carts",
      href: "/carts",
      as: "/carts"
    },
    {
      isActive: false,
      label: "Cart",
      id: 5,
      href: "/cart",
      as: "/cart"
    }]
  };

  return <BreadcrumbsWrapper title="Multiple Links"><Breadcrumbs {...props} /></BreadcrumbsWrapper>;
};

