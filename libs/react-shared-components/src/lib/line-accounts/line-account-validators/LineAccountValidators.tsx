import { Button, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import { areLineAccountsValid, getTotalAmounts, getTotalPercentages } from '@multi-cart/util';
import React from 'react';
import { FaDollarSign as DollarIcon, FaPercentage as PercentageIcon } from 'react-icons/fa';
import './LineAccountValidators.module.scss';

/* eslint-disable-next-line */
export interface LineAccountValidatorsProps {
  line: CartLine
}

export function LineAccountValidators({ line }: LineAccountValidatorsProps) {
  return (
    <>
      <ButtonGroup
        size="sm"
        isAttached
        variant="outline"
        colorScheme={areLineAccountsValid(line) ? "green" : "red"}>
        <Button mr="-px">Percentages:
          <Text ml={2} fontWeight="bolder">{getTotalPercentages(line)}</Text>
        </Button>
        <IconButton aria-label="Percentage Icon" icon={<PercentageIcon />} />
      </ButtonGroup>
      <ButtonGroup
        size="sm"
        isAttached
        variant="outline"
        colorScheme={areLineAccountsValid(line) ? "green" : "red"}>
        <Button mr="-px">Line Total w/ Tax:
          <Text ml={2} fontWeight="bolder">{getTotalAmounts(line.cartLineAccounts)}</Text>
        </Button>
        <IconButton aria-label="Line Total with Tax" icon={<DollarIcon />} />
      </ButtonGroup>
    </>
  );
}

export default LineAccountValidators;
