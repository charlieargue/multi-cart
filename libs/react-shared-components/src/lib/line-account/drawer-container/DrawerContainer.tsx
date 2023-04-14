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
import React, { useCallback } from 'react';
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
  const [{ data }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();
  const [searchTerm, setSearchTerm] = React.useState('');

  // 🚧 -----------------------------------------------------
  // 🚧  🚧  🚧  🚧  🚧  🚧  Work-in-Progress 🚧  🚧  🚧  🚧  🚧
  // 🚧 ----------------------------------------------------
  const handleSelect = async (a: Account) => {
    // TODO: since line is updated super-fast, it already has the NEW CLA in there,  somehow??
    const remainingAmount = getRemainingAmount(line);
    console.log(`🚀  remainingAmount:`, remainingAmount);
    // TODO: possible to hack sums and get negative amounts, need to prohibit that (so setting it to .01, so yup doesn't jank things and make it so cannot update a negative auto-poplated amount)
    await addCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      accountNumber: a.accountNumber,
      // DECOMISH/BUG prolly: amount: remainingAmount > 0 ? remainingAmount : 0.01,
      amount: remainingAmount,
    });
    onClose();
  };

  const isAlreadySelected = useCallback(
    (accountNumber: string) => {
      return line.cartLineAccounts
        ? line.cartLineAccounts.filter((a) => a.accountNumber === accountNumber)
            .length !== 0
        : false;
    },
    [line.cartLineAccounts]
  );

  const filterFn = (account: Account) => 
    account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountName.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      btnRef={btnRef}
      drawerHeader={
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      }
    >
      <Divider />
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
          <Tbody>
          {data?.accounts.filter(filterFn).map((filteredAccount: Account) => (
            <AccountRow
                account={filteredAccount}
                isAlreadySelected={isAlreadySelected(filteredAccount.accountNumber)}
                handleSelect={handleSelect}
                key={filteredAccount.accountNumber}
              />
          ))}
          </Tbody>
        </Table>
    </Drawer>
  );
};

export default DrawerContainer;
