import { Divider, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue as mode, useDisclosure } from '@chakra-ui/react';
import { Account, CartLine, useAccountsQuery, useAddCartLineAccountMutation } from '@multi-cart/react-data-access';
import { AddLineAccountButton, LineAccountValidators } from '@multi-cart/react-shared-components';
import { DrawerContainer, TextMuted, SearchBar } from '@multi-cart/react-ui';
import { getRemainingAmount, toFriendlyCurrency } from '@multi-cart/util';
import React, { useEffect } from 'react';
import { FaRegCreditCard as LineAccountsIcon } from 'react-icons/fa';
import 'regenerator-runtime/runtime';

export interface LineAccountsContainerProps {
  line?: CartLine;
  children?: React.ReactNode;
  idx: number;
  // TODO: to make this re-usable, want to have prop for Add.onClick() handler?
}

export function LineAccountsContainer({ line, children, idx }: LineAccountsContainerProps) {
  const [{ data, fetching }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // TODO: if works, componentize this DRAWER!
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const onSearchChange = event => setSearchTerm(event.target.value);

  // ------------------
  // WRONG: filtered results SHOULD NOT be in here, can be computed!
  // DOUBLE WRONG: should NOT even be useEffect! just use unilateral data flow via props!
  useEffect(() => {
    const results = data?.accounts.filter(account =>
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) || account.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [data?.accounts, searchTerm]);

  // ------------------
  const handleSelect = async (a: Account) => {
    const remainingAmount = getRemainingAmount(line); // NOTE: since line is updated super-fast, it already has the NEW CLA in there,  somehow??
    await addCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      accountNumber: a.accountNumber,
      amount: remainingAmount,
    });
    // TODO:  cache will auto-refresh so behind modal will already show newest CLA
    onClose();
  };

  // ------------------
  const isAlreadySelected = (accountNumber: string): boolean => {
    return line.cartLineAccounts ? line.cartLineAccounts.filter((a) => a.accountNumber === accountNumber).length !== 0 : false;
  }

  const label = <>
    <LineAccountsIcon />
    <Text fontWeight="bold" fontSize="md">Line Accounts</Text>
  </>

  return (
    <>
      {/* LABEL, BUTTONS, VALIDATORS */}
      <Stack direction="row" spacing={4} align="center" mt={1} bg="green.50" px={4} py={2} rounded="md" shadow="unset">
        {label}
        <AddLineAccountButton btnRef={btnRef} clickHandler={onOpen} />
        <LineAccountValidators line={line} />
      </Stack>

      {/* DRAWER */}
      <DrawerContainer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        drawerHeader={<SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />}
      >
        <Divider />
        {/* RESULTS TABLE */}
        {
          !searchResults && fetching ? (<div>loading...</div>) : (
            <Table
              variant="simple"
              colorScheme="gray">
              <Thead>
                <Tr>
                  <Th><TextMuted style={{ "textAlign": "left" }}>Account #</TextMuted></Th>
                  <Th><TextMuted style={{ "textAlign": "left" }}>Name</TextMuted></Th>
                  <Th><TextMuted style={{ "textAlign": "left" }}>Amount Remaining</TextMuted></Th>
                </Tr>
              </Thead>
              <Tbody>
                {searchResults?.map((a, idx) => !a ? null : (
                  // className={clsx("cursor-hand",  "bg-warning text-muted" : null)}
                  <Tr
                    cursor={'pointer'}
                    backgroundColor={isAlreadySelected(a.accountNumber) ? "yellow.100" : "inherit"}
                    _hover={{
                      "backgroundColor": mode("gray.100", "gray.900"),
                    }}
                    key={a.accountNumber}

                    onClick={() => isAlreadySelected(a.accountNumber) ? null : handleSelect(a as Account)}>
                    <Td>{a.accountNumber}</Td>
                    <Td>{a.accountName}</Td>
                    <Td>{toFriendlyCurrency(a.amountRemaining)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
      </DrawerContainer>

      {/* CHILDREN aka individual line accounts */}
      {children}

    </>
  );
}

export default LineAccountsContainer;
