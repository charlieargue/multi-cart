import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import { getTotalAmounts, getTotalPercentages } from '@multi-cart/util';
import { Form } from 'formik';
import React, { ReactElement } from 'react';
import { FaDollarSign as DollarIcon, FaPercentage as PercentageIcon, FaRegCreditCard as LineAccountsIcon } from 'react-icons/fa';
import { ImPlus as PlusIcon } from 'react-icons/im';

export interface LineAccountButtonRowProps {
  line?: CartLine;
  children?: ReactElement;
  idx: number;
  // TODO: to make this re-usable, want to have prop for Add.onClick() handler?
}

export function LineAccountButtonRow({ line, children, idx }: LineAccountButtonRowProps) {
  // const [modalShow, setModalShow] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // TODO: if works, componentize this DRAWER!
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
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
          <DrawerHeader>Search by account number or name</DrawerHeader>

          {/* SEARCH FORM */}
          <DrawerBody>
            <Input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleChange} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
              </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );


  return (

    <>
      <Stack direction="row" spacing={4} align="center" mt={1}>
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
