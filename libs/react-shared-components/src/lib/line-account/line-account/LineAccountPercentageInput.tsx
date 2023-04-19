import { Box, InputRightAddon } from '@chakra-ui/react';
import { CartLine, CartLineAccount } from '@multi-cart/react-data-access';
import { InputField, TooltipMC } from '@multi-cart/react-ui';
import { areLineAccountsValid } from '@multi-cart/util';
import React from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';

export interface LineAccountPercentageInputProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

export const LineAccountPercentageInput = ({
  lineAccount,
  line,
}: LineAccountPercentageInputProps) => {
  return (
    <>
      <TooltipMC
        isHidden={areLineAccountsValid(line)}
        label={
          areLineAccountsValid(line)
            ? ''
            : '🛑 Percentage must be greater than 0 and less than 100, all percentages should sum to exactly 100, and line unit price cannot be zero'
        }
        placement="bottom"
      >
        <Box minW="60px" maxW="80px">
          <InputField
            style={
              areLineAccountsValid(line)
                ? { border: '1px solid green' }
                : { border: '1px solid red' }
            }
            required
            type="number"
            aria-label="percentage"
            name="percentage"
            id={`percentage_${lineAccount.id}`}
            unwrapped={true}
            radius="none"
          ></InputField>
        </Box>
      </TooltipMC>
      <InputRightAddon children={<PercentageIcon />} />
    </>
  );
};

export default LineAccountPercentageInput;
