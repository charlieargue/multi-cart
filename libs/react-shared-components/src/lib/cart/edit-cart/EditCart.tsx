import './EditCart.module.scss';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import { Cart, CartLine, useBlankCartLineMutation, useCartQuery, useDeleteCartMutation, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { AppLayout, CartNameEditable, LineAccount, LineAccountButtonRow, CartLineRow } from '@multi-cart/react-shared-components';
import { Breadcrumbs } from '@multi-cart/react-ui';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Alert, Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { ExclamationCircleFill, PlusCircleFill, XSquareFill } from 'react-bootstrap-icons';
import styles from './EditCart.module.scss';

interface EditCartProps { id: number }

export const EditCart = ({ id }: EditCartProps) => {
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
      {/* TODO: search for all style= and get 'em outta here!  */}
      <Container
        fluid
        className={clsx(styles["edit-cart__cart-header"], "py-3")}>
        <Row className="align-items-md-baseline">
          <Col className="pl-2 d-flex align-items-md-baseline">
            <CartNameEditable name={data.cart.name} id={data.cart.id} />
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
      <table className="table table-borderless table-responsive-sm table-sm mt-2" id="cart-table">
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

        {/* Cart Lines */}
        {
          data.cart.cartLines?.length ? (

            // TODO: switch to sort component, thx: https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
            <tbody>
              {
                data.cart.cartLines?.sort((a, b) => a.id - b.id).map((line, idx) => !line ? null : (
                  <CartLineRow key={line.id} line={line} idx={idx}>
                    <Alert variant="success" className={clsx(styles['edit-cart__line-account-container'], "mb-5 pb-3 d-flex justify-content-sm-between align-items-sm-baseline")}>
                      <LineAccountButtonRow line={line} />
                      {/* 🔴 TODO: flex-wrap only after 2 elements! */}
                      <div className="d-flex justify-content-sm-end mt-2 flex-wrap" >
                        {(line as CartLine)?.cartLineAccounts?.sort((a, b) => a.id - b.id).map((cla) => !cla ? null : (
                          <LineAccount
                            key={cla.id}
                            lineAccount={cla}
                            line={line} />
                        ))}
                      </div>
                    </Alert>
                  </CartLineRow>
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
            <td align="right"
              colSpan={8}
              className="border-radius-lg">
              <strong className=""><u>Total:</u></strong>
              <strong className="ml-3"><u className="font-weight-bolder">{toFriendlyCurrency(sumTotalCost(data.cart as Cart))}</u></strong>
            </td>
            <td align="left"
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
