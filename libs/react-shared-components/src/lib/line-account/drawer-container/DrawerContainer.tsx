// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Divider, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import {
  Account,
  CartLine,
  useAccountsQuery,
  useAddCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import { Drawer, SearchBar, TextMuted } from '@multi-cart/react-ui';
import { getRemainingAmount } from '@multi-cart/util';
import React from 'react';
import AccountRow from '../account-row/AccountRow';

export interface DrawerContainerProps {
  line: CartLine;
  isOpen: boolean;
  onClose();
  btnRef?: React.MutableRefObject<undefined>;
}

export const DrawerContainer = ({
  btnRef,
  isOpen,
  line,
  onClose,
}: DrawerContainerProps) => {
  const [{ data, fetching }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const onSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSelect = async (a: Account) => {
    // TODO: since line is updated super-fast, it already has the NEW CLA in there,  somehow??
    const remainingAmount = getRemainingAmount(line);
    // TODO: possible to hack sums and get negative amounts, need to prohibit that (so setting it to .01, so yup doesn't jank things and make it so cannot update a negative auto-poplated amount)
    await addCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      accountNumber: a.accountNumber,
      amount: remainingAmount > 0 ? remainingAmount : 0.01,
    });
    // TODO: cache will auto-refresh so behind modal will already show newest CLA (so? confused by this note, TBD)
    onClose();
  };

  // ------------------ TODO: useMemo this?
  // BUT HOW?
  // const isAlreadySelected = useMemo((accountNumber: string) =>line.cartLineAccounts ? line.cartLineAccounts.filter((a) => a.accountNumber === accountNumber).length !== 0 : false,
  // [accountNumber, line.cartLineAccounts]) as boolean;
  //
  const isAlreadySelected = (accountNumber: string): boolean => {
    return line.cartLineAccounts
      ? line.cartLineAccounts.filter((a) => a.accountNumber === accountNumber)
          .length !== 0
      : false;
  };

  const searchResults = [];
  data?.accounts.forEach((account: Account) => {
    // TODO: if you keep this, use actual .filter() to filter search results
    if (
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      // NOTE: re-computing this each render, no need for state/useEffect
      searchResults.push(
        <AccountRow
          account={account}
          isAlreadySelected={isAlreadySelected(account.accountNumber)}
          handleSelect={handleSelect}
          key={account.accountNumber}
        />
      );
    }
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      btnRef={btnRef}
      drawerHeader={
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      }
    >
      <Divider />
      {searchResults.length === 0 && fetching ? (
        <div>Loading...</div>
      ) : (
        <Table variant="simple" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>
                <TextMuted style={{ textAlign: 'left' }}>Account #</TextMuted>
              </Th>
              <Th>
                <TextMuted style={{ textAlign: 'left' }}>Name</TextMuted>
              </Th>
              <Th>
                <TextMuted style={{ textAlign: 'left' }}>
                  Amount Remaining
                </TextMuted>
              </Th>
            </Tr>
          </Thead>
          <Tbody>{searchResults}</Tbody>
        </Table>
      )}
    </Drawer>
  );
};

export default DrawerContainer;
