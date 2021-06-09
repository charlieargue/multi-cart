import {
  Alert, AlertIcon, Badge, Box, Button, Flex, HStack, Table, Tbody,
  Td, Tr, useColorModeValue as mode, Wrap, WrapItem
} from '@chakra-ui/react';
import { CartLine, useBlankCartLineMutation, useCartQuery, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { BigAlert, Breadcrumbs } from '@multi-cart/react-ui';
import { toDaysAgo } from '@multi-cart/util';
import React, { useEffect } from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';
import 'regenerator-runtime/runtime';
import LineAccount from '../../line-accounts/line-account/LineAccount';
import LineAccountsContainer from '../../line-accounts/line-accounts-container/LineAccountsContainer';
import { CartLineRow } from '../cart-line-row/CartLineRow';
import CartNameEditable from '../cart-name-editable/CartNameEditable';
import EditCartTableFooter from '../edit-cart-table-footer/EditCartTableFooter';
import EditCartTableHeader from '../edit-cart-table-header/EditCartTableHeader';
import styles from './EditCart.module.scss';

/* eslint-disable-next-line */
interface EditCartProps { id: string }

export const EditCart = ({ id }: EditCartProps) => {
  const [{ data, error, fetching }] = useCartQuery({
    variables: {
      id
    }
  });
  const [, blankCartLine] = useBlankCartLineMutation();
  const [, updateUser] = useUpdateUserMutation();

  useEffect(() => {
    updateUser({ currentCartId: id });
  }, [id, updateUser]);
  // TODO: does this need a DEP ARRAY? Try making it NULL, won't it still run on cmpnt load? And does changing between load cmpnts? if so, ALL GOOD!

  const links = [{
    isActive: true,
    label: "Cart",
    href: "/cart/[id]",
    as: `/cart/${id}`,
    id: data?.cart?.name
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
            <strong>created </strong> {toDaysAgo(data.cart.createdAt)}
          </Badge>
        </HStack>
        <Box className="text-right">
          <Button
            data-testid="btnAddCartLine"
            size="sm"
            colorScheme="green"
            onClick={() => blankCartLine({ cartId: data.cart.id })}>
            <PlusIcon />
              &nbsp;Add&nbsp;<strong>line</strong>
          </Button>
        </Box>
      </Flex>

      {/* 🛍 cart */}
      <Table variant="simple" colorScheme="pink" id="cart-table" size="lg" marginBottom={10}>
        <EditCartTableHeader />
        {data.cart.cartLines?.length ? (
          // TODO: switch to sort component, thx: https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
          // TODO: this won't work anymore: .sort((a, b) => a.id - b.id)
          <Tbody>
            {/*
               -------------------
               CART LINES 
               -------------------
               */}
            {data.cart.cartLines?.map((line, idx) => !line ? null : (
              <CartLineRow key={line.id} line={line} idx={idx}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={3}
                  rounded={{ md: 'lg' }}
                  bg={mode('white', 'gray.700')}
                  shadow="base"
                  mt={2}
                  mb={20}>
                  {/* WRAP IT ALL TOGETHER 
                      TODO: this won't work anymore: .sort((a, b) => a.id - b.id)
                      */}
                  <Wrap spacing="5" align="center">
                    <WrapItem>
                      <LineAccountsContainer line={line} />
                    </WrapItem>
                    {/*
                        -------------------
                        CART LINE ACCOUNTS
                        -------------------
                        */}
                    {(line as CartLine)?.cartLineAccounts?.map((cla) => !cla ? null : (
                      <WrapItem key={cla.id}>
                        <LineAccount
                          lineAccount={cla}
                          line={line} />
                      </WrapItem>
                    ))}
                  </Wrap>
                  {/* //END: WRAP IT ALL... */}
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
        <EditCartTableFooter cart={data.cart} />
      </Table>

    </>
  );
};
