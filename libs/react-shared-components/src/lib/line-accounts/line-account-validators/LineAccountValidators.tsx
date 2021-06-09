import { ButtonGroup, Button, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { getTotalPercentages, getTotalAmounts } from '@multi-cart/util';
import './LineAccountValidators.module.scss';
import { CartLine } from '@multi-cart/react-data-access';
import { FaPercentage as PercentageIcon, FaDollarSign as DollarIcon } from 'react-icons/fa';

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
        colorScheme={getTotalPercentages(line) === 100 ? "green" : "red"}>
        <Button mr="-px">Percentages:
          <Text ml={2} fontWeight="bolder">{getTotalPercentages(line)}</Text>
        </Button>
        <IconButton aria-label="Percentage Icon" icon={<PercentageIcon />} />
      </ButtonGroup>
      <ButtonGroup
        size="sm"
        isAttached
        variant="outline"
        colorScheme={getTotalPercentages(line) === 100 ? "green" : "red"}>
        <Button mr="-px">Line Total w/ Tax:
          <Text ml={2} fontWeight="bolder">{getTotalAmounts(line.cartLineAccounts)}</Text>
        </Button>
        <IconButton aria-label="Line Total with Tax" icon={<DollarIcon />} />
      </ButtonGroup>
    </>
  );
}

export default LineAccountValidators;
