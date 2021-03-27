import React from 'react';
import { Container } from 'react-bootstrap';
import { NavBar } from './NavBar';
import { Wrapper, WrapperVariant } from './Wrapper';

interface AppLayoutProps {
    variant?: WrapperVariant
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, variant }) => {
    return (
        <Container fluid className="mx-0 px-0">
            {/* <NavBar /> */}
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
        </Container>
    );
}