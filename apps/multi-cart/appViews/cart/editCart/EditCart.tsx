import { useBlankCartLineMutation, useCartQuery, useDeleteCartMutation, useUpdateUserMutation } from '@multi-cart/react-data-access';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Alert, Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { ExclamationCircleFill, PlusCircleFill, XSquareFill } from 'react-bootstrap-icons';
import { AppLayout } from '../../_layout';
import { CartLineRow } from './cartLineRow/CartLineRow';
import { Breadcrumbs } from '@multi-cart/react-ui';

// -------------------
// 🛍 CART PAGE 
// -------------------

export const EditCart: React.FC<{ id: number }> = ({ id }) => {
    const router = useRouter();
    const [{ data, error, fetching }] = useCartQuery({
        variables: {
            id
        }
    });
    const [, deleteCart] = useDeleteCartMutation();
    const [, blankCartLine] = useBlankCartLineMutation();
    const [, updateUser] = useUpdateUserMutation();

    // each load, no deps
    useEffect(() => {
        // it's -1 until loaded fully apparently 
        if (id !== -1) {
            const asyncWorkAround = async (id: number) => {
                await updateUser({ currentCartId: id });
            };
            asyncWorkAround(id);
        }
    }, [id]);

    // TODO: component-ize:
    const links = [{
        isActive: true,
        label: "Cart",
        id
    }];
    const breadcrumbs = <Breadcrumbs links={links} />;

    // fetching?
    if (fetching) {
        return (
            <AppLayout>
                {breadcrumbs}
                <div>Loading...</div>
            </AppLayout>
        );
    }

    // error?
    if (error) {
        console.log("🚀 ~ error", error)
        return (
            <AppLayout>
                {breadcrumbs}
                <Alert variant="danger">
                    {error.message}
                </Alert>
            </AppLayout>
        );
    }

    // bad cart ID?
    if (!data?.cart) {
        return (
            <AppLayout>
                {breadcrumbs}
                <Alert variant="warning">
                    Could not find cart
                </Alert>
            </AppLayout>
        );
    }

    // if 👍 all good!
    return (
        <AppLayout>
            {breadcrumbs}

            {/* 🛍 cart header  */}
            <Container fluid>
                <Row className="align-items-md-baseline">
                    <Col className="pl-2 d-flex align-items-md-baseline">
                        <h2>
                            <Button variant="success" size="lg" className="shadow-sm">
                                {data.cart.name}</Button>
                        </h2>
                        <div className="ml-2">
                            <Badge pill variant="secondary" className="opacity-5">
                                <strong>created on</strong> {data.cart.createdAt}
                            </Badge>
                        </div>
                    </Col>
                    <Col xs={2} className="text-right">
                        <Button
                            data-testid="btnAddCartLine"
                            size="sm"
                            variant="success"
                            onClick={() => blankCartLine({ cartId: data.cart!.id })}>
                            <PlusCircleFill className="align-text-bottom mr-1" />Add <strong>line</strong>
                        </Button>
                    </Col>

                </Row>
            </Container>

            {/* 🛍 cart */}
            <table className="table table-striped table-hover mt-2">
                <thead>
                    <tr className="text-muted">
                        <th className="pl-3">#</th>
                        <th>Item #</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>
                            <span>UOM</span>
                        </th>
                        <th><i className="fa fa-times"></i>&nbsp;Qty</th>
                        <th>Unit Price</th>
                        <th className="text-right pr-3">Total</th>
                        <th></th>
                    </tr>
                </thead>

                {/* Cart Lines? */}
                {
                    data.cart.cartLines?.length ? (

                        // ✅ OK, GOT DATA!
                        // TODO: switch to sort component, thx: https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
                        <tbody>
                            {
                                data.cart.cartLines?.sort((a, b) => a.id - b.id).map((line) => !line ? null : (
                                    <CartLineRow key={line.id} line={line} />
                                ))
                            }
                        </tbody>

                    ) : (
                            // ❌ empty cart 
                            <tbody>
                                <tr>
                                    <td className="pt-4" colSpan={20}>
                                        <Alert variant="light">
                                            <ExclamationCircleFill className="mr-2 mb-1" /> This cart is empty — <strong>please add a line</strong>!
                                    </Alert>
                                    </td>
                                </tr>
                            </tbody>

                        )
                }

                <tfoot>
                    <tr>
                        <td align="left"
                            colSpan={200}
                            className="border-radius-lg">

                            <div className="d-flex flex-row justify-content-end align-items-center">

                                {/* delete cart  */}
                                <div className="p-2">
                                    <Button
                                        className="bg-danger text-white fw-bold"
                                        size="sm"
                                        onClick={async () => {
                                            if (typeof data.cart?.id === "number") {
                                                const response = await deleteCart({
                                                    id: data.cart.id
                                                });
                                                if (response.data?.deleteCart === true) {
                                                    router.push("/");
                                                }
                                                if (error) {
                                                    console.log("🚀 ~ error", error);
                                                }

                                            }
                                        }}>
                                        <XSquareFill size={20} className="mr-1" /><strong>Delete</strong> Cart
                                    </Button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>

        </AppLayout>
    );
};
