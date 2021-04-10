import {
  Alert, AlertIcon, Badge, Box, Button, Flex, HStack, Stat, StatHelpText, StatLabel, StatNumber, Table,
  TableCaption, Tbody,
  Td, Tfoot, Thead,
  Tooltip,
  Tr
} from '@chakra-ui/react';
import { Cart, useBlankCartLineMutation, useCartQuery, useDeleteCartMutation, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { CartLineRow, CartNameEditable } from '@multi-cart/react-shared-components';
import { BigAlert, Breadcrumbs, TextMuted } from '@multi-cart/react-ui';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';
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
        <HStack spacing="5">
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
              &nbsp;Add <strong>line</strong>
          </Button>
        </Box>
      </Flex>

      {/* 🛍 cart */}
      {/* <table className="table table-borderless table-responsive-sm table-sm mt-2" > */}
      <Table variant="simple" colorScheme="pink" id="cart-table" size="lg" marginBottom={10}>
        <TableCaption>
          Prices are estimates and subject to change
            <Button
            ml={2}
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
            <strong>Delete</strong> Cart
              </Button>
        </TableCaption>
        <Thead>

          <Tr style={{ "height": "90px" }} valign="middle" color="gray.500" borderBottom="1px solid #ddd">
            <th>#</th>
            <th>Item #</th>
            <th>Description</th>
            <th>Category</th>
            <th>
              <Tooltip hasArrow label="Unit of Measurement" bg="gray.300" color="black">
                UOM
            </Tooltip>
            </th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th></th>
          </Tr>
        </Thead>
        

        {/* Cart Lines */}
        {
          data.cart.cartLines?.length ? (

            // TODO: switch to sort component, thx: https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
            <Tbody>
              {
                data.cart.cartLines?.sort((a, b) => a.id - b.id).map((line, idx) => !line ? null : (
                  <CartLineRow key={line.id} line={line} idx={idx}>
                    <Box borderWidth="1px" borderRadius="lg" p={3} shadow="sm" mt={2} mb={20} borderColor="pink">
                      Line Accounts Go Here!
                      {/* "mb-5 pb-3 d-flex justify-content-sm-between align-items-sm-baseline" */}
                      {/* <LineAccountButtonRow line={line} /> */}
                      {/* 🔴 TODO: flex-wrap only after 2 elements! */}
                      {/* <div className="d-flex justify-content-sm-end mt-2 flex-wrap" >
                        {(line as CartLine)?.cartLineAccounts?.sort((a, b) => a.id - b.id).map((cla) => !cla ? null : (
                          <LineAccount
                            key={cla.id}
                            lineAccount={cla}
                            line={line} />
                        ))}
                      </div> */}
                    </Box>
                  </CartLineRow>
                ))
              }
            </Tbody>

          ) : (
              // ❌ empty cart 
              <Tbody>
                <Tr>
                  <Td colSpan={20}>
                    <Alert variant="left-accent" status="info" colorScheme="pink">
                      <AlertIcon />
                        This cart is empty — <strong>please add a line</strong>!
                    </Alert>
                  </Td>
                </Tr>
              </Tbody>

            )
        }

        {/* FOOTER */}
        <Tfoot>
          <Tr>
            <Td
              align="right"
              colSpan={28}>

              <Flex
                justifyContent="flex-end"
                mr={{ base: -3, md: -3, xl: 9 }}>
                <Box>
                  <Stat align="right">
                    <StatLabel>Total:</StatLabel>
                    <StatNumber>{toFriendlyCurrency(sumTotalCost(data.cart as Cart))}</StatNumber>
                    <StatHelpText><TextMuted>not including shipping</TextMuted></StatHelpText>
                  </Stat>

                </Box>
              </Flex>
            </Td>
          </Tr>
        </Tfoot>
      </Table>

    </>
  );
};
