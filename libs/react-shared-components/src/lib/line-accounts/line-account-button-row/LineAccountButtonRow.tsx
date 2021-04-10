import { Box, Button, ButtonGroup, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, IconButton, Input, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue as mode, useDisclosure } from '@chakra-ui/react';
import { Account, CartLine, useAccountsQuery, useAddCartLineAccountMutation } from '@multi-cart/react-data-access';
import { getRemainingAmount, getTotalAmounts, getTotalPercentages, toFriendlyCurrency } from '@multi-cart/util';
import React, { ReactElement } from 'react';
import { FaDollarSign as DollarIcon, FaPercentage as PercentageIcon, FaRegCreditCard as LineAccountsIcon } from 'react-icons/fa';
import { ImPlus as PlusIcon } from 'react-icons/im';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';
import { TextMuted } from '@multi-cart/react-ui';


export interface LineAccountButtonRowProps {
  line?: CartLine;
  children?: ReactElement;
  idx: number;
  // TODO: to make this re-usable, want to have prop for Add.onClick() handler?
}

export function LineAccountButtonRow({ line, children, idx }: LineAccountButtonRowProps) {
  const [{ data, fetching }] = useAccountsQuery();
  const [, addCartLineAccount] = useAddCartLineAccountMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // TODO: if works, componentize this DRAWER!
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  // ------------------
  React.useEffect(() => {
    const results = data?.accounts.filter(account =>
      account.accountNumber.toLowerCase().includes(searchTerm) || account.accountName.toLowerCase().includes(searchTerm)
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

  // -------------------
  const drawerSelectLineAccounts = (
    <Drawer
      size="xl"
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {/* SEARCH FORM */}
            <HStack><SearchIcon /><Box>Search by account number or name</Box></HStack>
            <Input
              mt={2}
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleChange} />
          </DrawerHeader>

          <DrawerBody>

            <Divider />

            {/* RESULTS TABLE */}
            {
              !searchResults && fetching ? (<div>loading...</div>) : (
                <Table
                  variant="simple"
                  colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th><TextMuted style={{"textAlign": "left"}}>Account #</TextMuted></Th>
                      <Th><TextMuted style={{"textAlign": "left"}}>Name</TextMuted></Th>
                      <Th><TextMuted style={{"textAlign": "left"}}>Amount Remaining</TextMuted></Th>
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

          </DrawerBody>

        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );


  return (

    <>
      <Stack direction="row" spacing={4} align="center" mt={1} bg="green.50" px={4} py={2} rounded="md" shadow="unset">
        <LineAccountsIcon />
        <Text fontWeight="bold" fontSize="md">
          Line Accounts
        </Text>
        <Button
          ref={btnRef}
          onClick={onOpen}
          size="xs"
          colorScheme="green">
          <PlusIcon />
              &nbsp;Add&nbsp;<strong>account</strong>
        </Button>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          colorScheme={getTotalPercentages(line) === 100 ? "green" : "red"}>
          <Button mr="-px">Percentages: <Text ml={2} fontWeight="bolder">{getTotalPercentages(line)}</Text></Button>
          <IconButton aria-label="Percentage Icon" icon={<PercentageIcon />} />
        </ButtonGroup>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          colorScheme={getTotalPercentages(line) === 100 ? "green" : "red"}>
          <Button mr="-px">Line Total w/ Tax: <Text ml={2} fontWeight="bolder">{getTotalAmounts(line.cartLineAccounts)}</Text></Button>
          <IconButton aria-label="Line Total with Tax" icon={<DollarIcon />} />
        </ButtonGroup>
      </Stack>


      {/* DRAWER */}
      {drawerSelectLineAccounts}

      {/* CHILDREN */}
      {children}

    </>
  );
}

export default LineAccountButtonRow;
