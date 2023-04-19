import { Box, InputRightAddon } from '@chakra-ui/react';
import {
  CartLine,
  CartLineAccount,
  useUpdateCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import { InputField, TooltipMC } from '@multi-cart/react-ui';
import {
  areLineAccountsValid,
  computeAmountGivenPercentage,
} from '@multi-cart/util';
import { useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';

export interface LineAccountPercentageInputProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

export const LineAccountPercentageInput = ({
  lineAccount,
  line,
}: LineAccountPercentageInputProps) => {
  const { values } = useFormikContext<{ percentage: number }>();
  const formikPercentage = values?.percentage;
  const skipUseEffectInit = useRef(true);
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();


  // useEffect(() => {
  //   const resaveLineAccount = async () => {
  //     console.log(`🚀  formikPercentage:`, formikPercentage);
  //     const newAmountIfLinePriceOrQuantityChanges =
  //       computeAmountGivenPercentage({
  //         linePrice: line.price,
  //         lineQuantity: line.quantity,
  //         lineTax: 0,
  //         lineAccountPercentage: formikPercentage,
  //       });
  //     await updateCartLineAccount({
  //       cartId: line.cartId,
  //       cartLineId: line.id,
  //       id: lineAccount.id,
  //       amount: newAmountIfLinePriceOrQuantityChanges,
  //     });
  //     // skipUseEffectInit.current = false;
  //   };

  //   // if (skipUseEffectInit.current === false) {
  //   console.log(`🚀 UPDATING CLA.amount because LINE PRICE or QUANTITY changed!`);
  //   resaveLineAccount().catch((err) => {
  //     console.log(`🚀  err:`, err);
  //   });
  //   // }
  // }, [
  //   line.cartId,
  //   line.id,
  //   line.price,
  //   line.quantity,
  //   lineAccount.id,
  //   // skipUseEffectInit,
  //   updateCartLineAccount,
  // ]);

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
