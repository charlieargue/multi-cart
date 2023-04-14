import { Box, InputRightAddon } from '@chakra-ui/react';
import { InputField, TooltipMC } from '@multi-cart/react-ui';
import {
  areLineAccountsValid,
  computeAmountGivenPercentage,
} from '@multi-cart/util';
import React, { useEffect, useRef } from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';
import { AutoSave } from '../../auto-save/AutoSave';
import {
  CartLine,
  CartLineAccount,
  useUpdateCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import { useFormikContext } from 'formik';

export interface LineAccountPercentageInputProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

export const LineAccountPercentageInput = ({
  lineAccount,
  line,
}: LineAccountPercentageInputProps) => {
  const { values } = useFormikContext();
  const formikPercentage = (values as any)?.percentage;
//   console.log(`🚀  formikPercentage:`, formikPercentage);
  const skipUseEffectInit = useRef(true);
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();

  useEffect(() => {
    if (skipUseEffectInit.current === false) {
      console.log(`🟡 🟡 🟡 🟡  ~ USE EFFECT - LINE PRICE or QUANT changed!!!`, lineAccount.accountNumber);
      // ------------------- update LA.AMOUNT when line.price|qty changes!
      // • anytime line.price or line.quantity changes
      // • need to hit a) calculate new AMOUNT for this LA
      // • and hit the DB saving that!
    //   console.log(`🚀  formikPercentage:`, formikPercentage);

      // ok, at this point, only a LINE P or Q has changed, AND we have access to the latest PERCENTAGE for this CLA, so we need to:
      // new NEW TOTAL * PERCENTAGE = new AMOUNT!

      const newAmount = computeAmountGivenPercentage({
        linePrice: line.price,
        lineQuantity: line.quantity,
        lineTax: 0,
        lineAccountPercentage: formikPercentage,
      });
      updateCartLineAccount({
        cartId: line.cartId,
        cartLineId: line.id,
        id: lineAccount.id,
        amount: newAmount,
      });
    }
    skipUseEffectInit.current = false; // but now that skipped, make sure not initializing anymore
  }, [
    line.cartId,
    line.id,
    line.price,
    line.quantity,
    lineAccount.id,
    updateCartLineAccount,
    formikPercentage,
  ]);

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
          <AutoSave debounceMs={100} />
        </Box>
      </TooltipMC>
      <InputRightAddon children={<PercentageIcon />} />
    </>
  );
};

export default LineAccountPercentageInput;
