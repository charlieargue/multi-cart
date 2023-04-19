import { Badge, BadgeProps, HStack, Text } from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import { areLineAccountsValid, getTotalAmounts, getTotalPercentages, toFriendlyCurrency } from '@multi-cart/util';
import React from 'react';

export interface LineAccountValidatorsProps {
  line: CartLine
}

export function LineAccountValidators({ line }: LineAccountValidatorsProps) {

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
          <Text data-testid="lineAccountTotalPercentages" ml={2} fontWeight="bolder">{getTotalPercentages(line)}%</Text>
        </HStack>
      </Badge>
      <Badge {...badgeAttribs}>
        <HStack>
          <Text>Line Total w/ Tax:</Text>
          <Text data-testid="lineAccountLineTotal" ml={2} fontWeight="bolder">{toFriendlyCurrency(getTotalAmounts(line.cartLineAccounts))}</Text>
        </HStack>
      </Badge>
    </>
  );
}

export default LineAccountValidators;
