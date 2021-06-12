import { Divider, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Account, CartLine, useAccountsQuery, useAddCartLineAccountMutation } from '@multi-cart/react-data-access';
import { DrawerContainer, SearchBar } from '@multi-cart/react-ui';
import { getRemainingAmount, getTotalPercentages, hasNegativeAmounts } from '@multi-cart/util';
import React from 'react';
import { FaRegCreditCard as LineAccountsIcon } from 'react-icons/fa';
import AccountRow from '../account-row/AccountRow';
import AddLineAccountButton from '../add-line-account-button/AddLineAccountButton';
import FilterableAccountTable from '../filterable-account-table/FilterableAccountTable';
import LineAccountValidators from '../line-account-validators/LineAccountValidators';

export interface LineAccountsContainerProps {
  line?: CartLine;
}

export function LineAccountsContainer({ line }: LineAccountsContainerProps) {
  const [{ data, fetching }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [searchTerm, setSearchTerm] = React.useState("");
  const onSearchChange = event => setSearchTerm(event.target.value);

  // ------------------
  const handleSelect = async (a: Account) => {
    const remainingAmount = getRemainingAmount(line); // NOTE: since line is updated super-fast, it already has the NEW CLA in there,  somehow??
    await addCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      accountNumber: a.accountNumber,
      amount: remainingAmount,
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
    return line.cartLineAccounts ? line.cartLineAccounts.filter((a) => a.accountNumber === accountNumber).length !== 0 : false;
  }

  const label = <>
    <LineAccountsIcon />
    <Text fontWeight="bold" fontSize="md">Line Accounts</Text>
  </>


  const searchResults = [];
  data?.accounts.forEach((account: Account) => {

    // filter search results
    if (account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase())) {

      // NOTE: re-computing this each render, no need for state/useEffect
      searchResults.push(<AccountRow
        account={account}
        isAlreadySelected={isAlreadySelected(account.accountNumber)}
        handleSelect={handleSelect}
        key={account.accountNumber}
      />
      );
    }
  });

  // -------------------
  return (
    <>
      {/* LABEL, BUTTONS, VALIDATORS */}
      <Stack
        direction="row"
        spacing={4}
        align="center"
        mt={1}
        bg={(getTotalPercentages(line) === 100 && !hasNegativeAmounts(line)) ? "green.50" : "red.100"}
        px={4}
        py={3}
        rounded="md"
        shadow="unset">
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
          searchResults.length === 0 && fetching ? (<div>Loading...</div>) : (
            <FilterableAccountTable>
              {searchResults}
            </FilterableAccountTable>
          )}
      </DrawerContainer>

    </>
  );
}

export default LineAccountsContainer;
