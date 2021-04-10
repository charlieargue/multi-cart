import { Alert, Badge, Box, Button, Flex, HStack } from '@chakra-ui/react';
import { Cart, useBlankCartLineMutation, useCartQuery, useDeleteCartMutation, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { BigAlert, Breadcrumbs } from '@multi-cart/react-ui';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import { CartNameEditable } from '@multi-cart/react-shared-components';
import styles from './EditCart.module.scss';
import { ImPlus as PlusIcon } from 'react-icons/im';

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
  }, [id, updateUser]);
  // TODO: does this need a DEP ARRAY? Try making it NULL, won't it still run on cmpnt load? And does changing between load cmpnts? if so, ALL GOOD!

  // TODO: component-ize:
  const links = [{
    isActive: true,
    label: "Cart",
    href: "/cart/[id]",
    as: `/cart/${id}`,
    id
  }];
  const breadcrumbs = (<Breadcrumbs links={links} />);

  // fetching?
  // TODO: loading indicator
  if (fetching) {
    return (
      <>
        {breadcrumbs}
        <div>Loading...</div>
      </>
    );
  }

  // big error
  if (error) {
    console.log("🚀 ~ error", error)
    return (
      <>
        {breadcrumbs}
        <BigAlert type="error" title="Ooops, sorry! An error occurred:">
          <BigAlert.Message>
            {error.message}
          </BigAlert.Message>
        </BigAlert>
      </>
    );
  }

  // bad cart ID?
  if (!data?.cart) {
    return (
      <>
        {breadcrumbs}

        <BigAlert type="warning" title="Sorry...">
          <BigAlert.Message>
            Unfortunately, we could not find this cart!
          </BigAlert.Message>
        </BigAlert>


      </>
    );
  }

  // if 👍 all good!
  return (
    <>
      {breadcrumbs}

      {/* 🛍 cart header  */}
      <Flex
        justify="space-between"
        py={6}
        className={styles["edit-cart__cart-header"]}>
        <HStack>
          <CartNameEditable name={data.cart.name} id={data.cart.id} />
          <Badge colorScheme="pink" style={{ "opacity": ".5" }}>
            <strong>created on</strong> {data.cart.createdAt}
          </Badge>
        </HStack>
        <Box className="text-right">
          <Button
            data-testid="btnAddCartLine"
            size="sm"
            colorScheme="green"
            onClick={() => blankCartLine({ cartId: data.cart.id })}>
            <PlusIcon />
              Add <strong>line</strong>
          </Button>
        </Box>
      </Flex>

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
                  // <CartLineRow key={line.id} line={line} idx={idx}>
                  //   <Alert variant="success" className={clsx(styles['edit-cart__line-account-container'], "mb-5 pb-3 d-flex justify-content-sm-between align-items-sm-baseline")}>
                  //     <LineAccountButtonRow line={line} />
                  //     {/* 🔴 TODO: flex-wrap only after 2 elements! */}
                  //     <div className="d-flex justify-content-sm-end mt-2 flex-wrap" >
                  //       {(line as CartLine)?.cartLineAccounts?.sort((a, b) => a.id - b.id).map((cla) => !cla ? null : (
                  //         <LineAccount
                  //           key={cla.id}
                  //           lineAccount={cla}
                  //           line={line} />
                  //       ))}
                  //     </div>
                  //   </Alert>
                  // </CartLineRow>
                  <div></div>
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
                {/* <div className="p-2">
                  <Button
                    className="bg-danger text-white fw-bold"
                    size="sm"
                    onClick={async () => {
                      if (typeof data.cart?.id === "number") {
                        const response = await deleteCart({
                          id: data.cart.id
                        });
                        if (response.data?.deleteCart === true) {
                          router.push("/dashboard");
                        }
                        if (error) {
                          console.log("🚀 ~ error", error);
                        }

                      }
                    }}>
                    <XSquareFill size={20} className="mr-1" /><strong>Delete</strong> Cart
                                    </Button>
                </div> */}



              </div>
            </td>
          </tr>
        </tfoot>
      </table>

    </>
  );
};
