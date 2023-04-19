import { Td, Tr, useColorModeValue as mode } from '@chakra-ui/react';
import { Account } from '@multi-cart/react-data-access';
import { toFriendlyCurrency } from '@multi-cart/util';
import React from 'react';

export interface AccountRowProps {
  account: Account;
  isAlreadySelected: boolean;
  handleSelect(a: Account);
}

export const AccountRow = ({
  isAlreadySelected,
  account,
  handleSelect,
}: AccountRowProps) => {
  return (
    <Tr
      cursor={'pointer'}
      backgroundColor={isAlreadySelected ? 'yellow.100' : 'inherit'}
      _hover={{
        backgroundColor: mode('gray.100', 'gray.900'),
      }}
      key={account.accountNumber}
      onClick={() => (isAlreadySelected ? null : handleSelect(account))}
    >
      <Td>{account.accountNumber}</Td>
      <Td>{account.accountName}</Td>
      <Td>{toFriendlyCurrency(account.amountRemaining)}</Td>
    </Tr>
  );
};

export default AccountRow;
