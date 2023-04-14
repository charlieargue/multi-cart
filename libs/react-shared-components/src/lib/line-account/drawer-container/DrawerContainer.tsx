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

  const handleSelect = async (a: Account) => {
    onClose();
    const remainingAmount = getRemainingAmount(line);
    await addCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      accountNumber: a.accountNumber,
      amount: Math.abs(remainingAmount),
    });
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
