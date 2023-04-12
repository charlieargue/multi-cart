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
  account: a,
  handleSelect,
}: AccountRowProps) => {
  return (
    <Tr
      cursor={'pointer'}
      backgroundColor={isAlreadySelected ? 'yellow.100' : 'inherit'}
      _hover={{
        backgroundColor: mode('gray.100', 'gray.900'),
      }}
      key={a.accountNumber}
      onClick={() => (isAlreadySelected ? null : handleSelect(a as Account))}
    >
      <Td>{a.accountNumber}</Td>
      <Td>{a.accountName}</Td>
      <Td>{toFriendlyCurrency(a.amountRemaining)}</Td>
    </Tr>
  );
};

export default AccountRow;
