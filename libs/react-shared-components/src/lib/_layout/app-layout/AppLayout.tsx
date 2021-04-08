import './AppLayout.module.scss';
import React from 'react';
import { Container } from 'react-bootstrap';
import { WrapperVariant, Wrapper } from '@multi-cart/react-ui';
import { NavBar } from '@multi-cart/react-shared-components';

interface AppLayoutProps {
  variant?: WrapperVariant
  children?: React.ReactNode
}

export const AppLayout = ({ children, variant }: AppLayoutProps) => {
  return (
    <Container fluid className="mx-0 px-0">
      <NavBar />
      <Wrapper variant={variant}>
        {children}
      </Wrapper>
    </Container>
  );
}