import { Badge, BadgeProps, Button, ButtonGroup, HStack, IconButton, Text } from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import { areLineAccountsValid, getTotalAmounts, getTotalPercentages, toFriendlyCurrency } from '@multi-cart/util';
import React from 'react';
import { FaDollarSign as DollarIcon, FaPercentage as PercentageIcon } from 'react-icons/fa';
import './LineAccountValidators.module.scss';

export interface LineAccountValidatorsProps {
  line: CartLine
}

export function LineAccountValidators({ line }: LineAccountValidatorsProps) {

  // TODO: if use this more, make it a component! (rule of threes!)
  const badgeAttribs: BadgeProps = {
    "textTransform": "none",
    "borderRadius": "6px",
    "px": "2",
    "size": "xs",
    "variant": "outline",
    "colorScheme": areLineAccountsValid(line) ? "green" : "red"
  };

  return (
    <>
      <Badge {...badgeAttribs}>
        <HStack>
          <Text>Percentages:</Text>
          <Text ml={2} fontWeight="bolder">{getTotalPercentages(line)}%</Text>
        </HStack>
      </Badge>
      <Badge {...badgeAttribs}>
        <HStack>
          <Text>Line Total w/ Tax:</Text>
          <Text ml={2} fontWeight="bolder">{toFriendlyCurrency(getTotalAmounts(line.cartLineAccounts))}</Text>
        </HStack>
      </Badge>
    </>
  );
}

export default LineAccountValidators;
