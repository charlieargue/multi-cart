import './NavBar.module.scss';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useLogoutMutation, useMeQuery } from '@multi-cart/react-data-access';
import { CartAvatar } from '@multi-cart/react-shared-components';

export const NavBar = () => {
    const router = useRouter();
    const [{ data, fetching }] = useMeQuery();
    const [_, logout] = useLogoutMutation();

    let body = null;
    const authLinks = (
        <>
            <NextLink href="/login">
                <a className="mr-2">login</a>
            </NextLink>
            <NextLink href="/register">
                <a>register</a>
            </NextLink>
        </>
    );
    const currentUserAvatar = (
        <div className="d-flex align align-items-sm-baseline">
            <div className="mr-2 text-white">{data?.me?.username}</div>
            <CartAvatar currentCartId={data?.me?.currentCartId as number}/>
            <Button variant="link" onClick={async () => {
                
                await logout();
                router.push("/login").finally(() => router.reload());
            }}>logout</Button>
        </div>
    );

    // our 3 states:
    // (1) data is loading/fetching
    if (fetching) {
        // do nothing, user NOT logged in
        
    } else if (!data?.me) {
        // (2) user is NOT logged in
        body = authLinks;
    } else {
        // (3) user IS ✅ logged in! (don't show auth links)
        body = currentUserAvatar;
    }

    // thx: https://react-bootstrap.github.io/components/navbar/#navbars-mobile-friendly
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="shadow-sm px-0">
            <Container className="nav-container" fluid>
                <NextLink href="/">
                    <a>
                        <Navbar.Brand>
                            <h3 className="d-none d-md-block">
                                🛍<span className="ml-2 mr-2">multi cart</span>
                                <small className="text-muted">✸ urql</small>
                            </h3>
                        </Navbar.Brand>
                    </a>
                </NextLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="ml-auto">
                    {body}
                </Nav>
            </Container>
        </Navbar >
    );
}