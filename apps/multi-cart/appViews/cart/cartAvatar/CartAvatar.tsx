import clsx from 'clsx';
import { Cart, useCartsQuery } from '@multi-cart/react-data-access';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React from 'react';
import { Badge, Button, Col, Container, ListGroup, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { NewCartButton } from "../newCartButton/NewCartButton";
import styles from './CartAvatar.module.scss';
import { CartAvatarInner } from './CartAvatarInner';
import { toDaysAgo } from '@multi-cart/multi-cart/util';

interface CartAvatarProps {
    currentCartId?: number;
}

// TODO: 🔴 try this approach: https://stackoverflow.com/questions/28935314/reactbootstrap-popover-dismiss-on-click-outside
// no overlayTRIGGER, and with onHide...

export const CartAvatar: React.FC<CartAvatarProps> = ({ currentCartId = -1 }) => {
    // NEXT: wire up avatarInner to user.currentCartId
    // FOR NOW: wiring up avatarInner based on page param
    const router = useRouter();

    const [{ data, fetching }] = useCartsQuery();

    // 🔴 TODO: NOT LIKE THIS 
    let currentCart: Cart = {} as Cart;
    if ((currentCartId !== -1) && !fetching && data?.carts) {
        currentCart = data?.carts.find((c) => c.id === currentCartId) as Cart;
    }

    const popover = (
        <Popover
            id="popover-carts-avatar"
            className={clsx(styles['cart-avatar__scrollable'], 'shadow-sm')}>
            <Popover.Title as="h3" className="text-right">
                {!data?.carts?.length && (<span>You have no carts!</span>)}
                <NewCartButton className="ml-3 align-baseline" />

            </Popover.Title>
            <Popover.Content >

                {/* if FETCHING and don't have DATA... */}
                {
                    !data && fetching ? (<div>loading...</div>) : (

                        // OK, GOT DATA!
                        <div>
                            <ListGroup variant="flush">
                                {data?.carts?.map((c) => !c ? null : (
                                    <ListGroup.Item key={c.id}
                                        className={clsx(
                                            c.id == 2 ? styles['cart-avatar__current-cart'] : null,
                                            'p-1')}>
                                        <NextLink
                                            href="/cart/[id]"
                                            as={`/cart/${c.id}`}>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <Badge variant="success" className="mr-1">{c.id}</Badge>
                                                        <strong>{c.name}</strong>
                                                        <br />
                                                        {toDaysAgo(c.createdAt)}
                                                    </Col>
                                                    <Col className="align-self-xl-center text-right">
                                                        <CartAvatarInner
                                                            variant="black"
                                                            cart={!c ? {} as any : c}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </NextLink>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
            </Popover.Content>
        </Popover>
    );


    return (<OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        rootClose>
        <Button
            variant="outline-secondary"
            color="transparent"
            data-testid="btnMyCarts"
            className="align-self-xl-center shadow-none">
            {
                // TODO:  change to: data && !fetching && (
                !data && fetching ? (<></>) : (
                    <CartAvatarInner cart={currentCart} />
                )}

        </Button>
    </OverlayTrigger>
    );
}