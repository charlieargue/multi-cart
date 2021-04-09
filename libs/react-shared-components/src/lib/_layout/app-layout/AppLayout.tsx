import { NavBar } from '@multi-cart/react-shared-components';
import React from 'react';
import { Container } from 'react-bootstrap';
import './AppLayout.module.scss';

interface AppLayoutProps {
  children?: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Container fluid className="mx-0 px-0">
      <NavBar />
        {children}
    </Container>
  );
}