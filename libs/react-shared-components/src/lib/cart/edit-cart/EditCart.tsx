import {
  Alert, AlertIcon, Badge, Box, Button, Divider, Flex, HStack, Stat, StatHelpText, StatLabel, StatNumber, Table,
  TableCaption, Tbody,
  Td, Tfoot, Thead,
  Tooltip, Text,
  Tr, useColorModeValue as mode, Wrap, WrapItem
} from '@chakra-ui/react';
import { Cart, CartLine, useBlankCartLineMutation, useCartQuery, useDeleteCartMutation, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { CartLineRow, CartNameEditable, LineAccount, LineAccountsContainer } from '@multi-cart/react-shared-components';
import { BigAlert, Breadcrumbs, TextMuted } from '@multi-cart/react-ui';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { ImPlus as PlusIcon } from 'react-icons/im';
import styles from './EditCart.module.scss';
import 'regenerator-runtime/runtime';
import { toDaysAgo } from '@multi-cart/util';

interface EditCartProps { id: string }

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
    if (id) {
      // TODO: hacky? better way? decomish after switch to DDB/guids?
      const asyncWorkAround = async (id: string) => {
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
        <TableCaption>
          Prices are estimates and subject to change
            <Button
            ml={2}
            size="sm"
            onClick={async () => {
              if (data.cart?.id) {
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

          <Tr
            shadow="sm"
            height="12"
            align="left"
            valign="middle"
            color="gray.500"
            bg={mode("gray.100", "gray.700")}
            borderBottom="1px solid #ddd">
            {/* HACKY: TODO: must be a better way to align */}
            <th><Box ml={7}>#</Box></th>
            <th><Box ml={8}>Item #</Box></th>
            <th><Box ml={8}>Description</Box></th>
            <th><Box ml={8}>Category</Box></th>
            <th>
              <Box ml={8}><Tooltip hasArrow label="Unit of Measurement" bg="gray.300" color="black">
                UOM
            </Tooltip></Box>
            </th>
            <th><Box ml={8}>Quantity</Box></th>
            <th><Box ml={8}>Unit Price</Box></th>
            <th><Box ml={8}>Total</Box></th>
            <th></th>
          </Tr>
        </Thead>


        {/* Cart Lines */}
        {
          data.cart.cartLines?.length ? (

            // TODO: switch to sort component, thx: https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
            // TODO: this won't work anymore: .sort((a, b) => a.id - b.id)
            <Tbody>
              {
                data.cart.cartLines?.map((line, idx) => !line ? null : (
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
                        <WrapItem><LineAccountsContainer line={line} idx={idx} /></WrapItem>

                        {(line as CartLine)?.cartLineAccounts?.map((cla) => !cla ? null : (
                          <WrapItem>
                            <LineAccount
                              key={cla.id}
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
        <Tfoot>
          <Tr>
            <Td
              align="right"
              colSpan={28}>

              <Flex
                justifyContent="flex-end"
                mr={{ base: -3, md: -3, xl: "75px" }}>
                <Box>
                  <Stat align="right">
                    <StatLabel>Total:</StatLabel>
                    <StatNumber>{toFriendlyCurrency(sumTotalCost(data.cart as Cart))}</StatNumber>
                    <StatHelpText fontWeight="hairline">not including shipping</StatHelpText>
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
