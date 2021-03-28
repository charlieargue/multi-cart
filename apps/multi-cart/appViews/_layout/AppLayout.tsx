import React from 'react';
import { Container } from 'react-bootstrap';
import { WrapperVariant, Wrapper } from '@multi-cart/react-ui';
import { NavBar } from './NavBar';

interface AppLayoutProps {
    variant?: WrapperVariant
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, variant }) => {
    return (
        <Container fluid className="mx-0 px-0">
            <NavBar />
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
        </Container>
    );
}