import {
  Alert, AlertIcon, Box, Fade, SkeletonCircle, SkeletonText, Table, Tbody,
  Td, Tr, Wrap, WrapItem
} from '@chakra-ui/react';
import { StateType } from '@multi-cart/react-app-state';
import { CartLine, useCartQuery, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { BigAlert, Breadcrumbs, Sort } from '@multi-cart/react-ui';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LineAccount from '../../line-account/line-account/LineAccount';
import LineAccountsContainer from '../../line-account/line-accounts-container/LineAccountsContainer';
import CartLineRow from '../cart-line-row/CartLineRow';
import EditCartHeader from '../edit-cart-header/EditCartHeader';
import EditCartTableFooter from '../edit-cart-table-footer/EditCartTableFooter';
import EditCartTableHeader from '../edit-cart-table-header/EditCartTableHeader';

/* eslint-disable-next-line */
interface EditCartProps { id: string }

export const EditCart = ({ id }: EditCartProps) => {
  const isDeletingCart = useSelector((state: StateType) => state?.isDeletingCart);
  const [{ data, error, fetching }] = useCartQuery({
    variables: {
      id
    }
  });
  const [, updateUser] = useUpdateUserMutation();

  useEffect(() => {
    updateUser({ currentCartId: id });
  }, [id, updateUser]);

  const links = [{
    isActive: true,
    label: "Cart",
    href: `/cart/${id}`,
    id: data?.cart?.name
  }];
  const breadcrumbs = (<Breadcrumbs links={links} />);

  const emptyCartTableBody = (<Tbody>
    <Tr>
      <Td colSpan={20}>
        <Alert borderRadius="4px" variant="left-accent" status="info" colorScheme="pink">
          <AlertIcon />
              This cart is empty — <strong>please add a line</strong>!
          </Alert>
      </Td>
    </Tr>
  </Tbody>);


  const cartSkeleton = (<Fade in={true}>
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
    <Box padding="6" boxShadow="lg" bg="white" mt={8}>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
    <Box padding="6" boxShadow="lg" bg="white" mt={8}>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  </Fade>);

  // fetching?
  // TODO: loading indicator
  if (fetching) {
    return (
      <>
        {breadcrumbs}
        {cartSkeleton}
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
  if (!data?.cart && !isDeletingCart) {
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
      <EditCartHeader cart={data.cart} />

      <Table variant="simple" colorScheme="pink" id="cart-table" size="lg" marginBottom={10}>
        <EditCartTableHeader />
        {data.cart?.cartLines?.length ? (
          // TODO: switch to sort component, thx: https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties
          // TODO: this won't work anymore: .sort((a, b) => a.id - b.id)
          <Tbody>
            {/* <Sort by='createdAt'> */}
            <Sort by='createdAt' keyToSortBy="description">
              {data.cart.cartLines?.map((line, idx) => !line ? null : (
                <CartLineRow key={line.id} line={line} idx={idx}>
                  {/* 💥 WARNING: this line causes ORDER-of-HOOKS ERROR: bg={mode('white', 'gray.700')} on <Box> 
                TODO: when doing dark mode, put this elswhere, maybe on Tbody? TBD
                */}
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={3}
                    rounded={{ md: 'lg' }}
                    shadow="base"
                    mt={2}
                    mb={20}>
                    <Wrap spacing="5" align="center">
                      <WrapItem>
                        {/* TODO: poorly named, does not actually contain line accounts! perhaps LineAccountsHeader??? */}
                        <LineAccountsContainer line={line} />
                      </WrapItem>
                      {/*   TODO: this won't work anymore: .sort((a, b) => a.id - b.id) */}
                      {(line as CartLine)?.cartLineAccounts?.map((cla) => !cla ? null : (
                        <WrapItem key={cla.id}>
                          <LineAccount lineAccount={cla} line={line} />
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                </CartLineRow>
              ))}
            </Sort>
          </Tbody>

        ) : emptyCartTableBody
        }

        {/* FOOTER */}
        <EditCartTableFooter cart={data.cart} />
      </Table>

    </>
  );
};
