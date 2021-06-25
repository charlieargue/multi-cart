import React from 'react';
import AccountRow, { AccountRowProps } from './AccountRow';
import { Account } from '@multi-cart/react-data-access';
import { StylesProvider } from '@chakra-ui/react';
import FilterableAccountTable from '../filterable-account-table/FilterableAccountTable';

export default {
  component: AccountRow,
  title: 'AccountRow',
};

export const primary = () => {
  const rows: AccountRowProps[] = [{
    account: {
      id: "94ed9a18-8c91-4181-b8f6-c625e52e71a0",
      accountName: "Automotive",
      accountNumber: "60429-623",
      amountRemaining: 317243.93,
      createdAt: "2021-06-14T19:46:42.908Z",
      updatedAt: "2021-06-14T19:46:42.908Z"
    } as Account,
    isAlreadySelected: false,
    handleSelect: () => alert('Selected')
  },
  {
    account: {
      id: "8c91-4181-b8f6-c625e52e71a0",
      accountName: "Office",
      accountNumber: "9-623",
      amountRemaining: 1555.93,
      createdAt: "2021-06-14T19:46:42.908Z",
      updatedAt: "2021-06-14T19:46:42.908Z"
    } as Account,
    isAlreadySelected: true,
    handleSelect: () => alert('Selected')
  }];

  // NOTE: needed StylesProvider suddenly because of SideBarItem.stories.error: 
  // 🔴 useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` 
  return <StylesProvider value={{}}>
    <FilterableAccountTable>
      {rows.map((row) => (
        <AccountRow
          account={row.account}
          isAlreadySelected={row.isAlreadySelected}
          handleSelect={row.handleSelect}
          key={row.account.accountNumber}
        />
      ))}
    </FilterableAccountTable>
  </StylesProvider>;
};
