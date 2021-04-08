import clsx from 'clsx';
import React from 'react';
import { Container } from 'react-bootstrap';

export type WrapperVariant = 'small' | 'regular';


interface WrapperProps {
    variant?: WrapperVariant;
    children?: React.ReactNode;
}

export const Wrapper = ({ children, variant = 'regular' }: WrapperProps) => {
    return (
        <Container
            className={clsx(variant === 'regular' ? "md-container" : "sm-container", "mt-3")}
            fluid>
            { children}
        </Container>
    );
}