import { Button, ButtonGroup, IconButton, Stack, Text } from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import { getTotalAmounts, getTotalPercentages } from '@multi-cart/util';
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

  return (

    <>
      <Stack direction="row" spacing={4} align="center">
        <LineAccountsIcon />
        <Text fontWeight="bold" fontSize="md">
          Line Accounts
        </Text>
        <Button
          size="xs"
          colorScheme="green"
          onClick={() => console.log('drawer time!') /*setModalShow(true)*/}>
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


      {/* MODAL */}
      {/* <LineAccountModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        line={line}
      /> */}

      {children}

    </>
  );
}

export default LineAccountButtonRow;
