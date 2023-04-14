// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import {
  Badge,
  Box,
  HStack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import {
  CartLine,
  CartLineAccount,
  useUpdateCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import { InputField, TooltipMC } from '@multi-cart/react-ui';
import {
  areLineAccountsValid,
  computeAmountGivenPercentage,
  computePercentageGivenAmount,
  toFriendlyCurrency,
} from '@multi-cart/util';
import { Formik } from 'formik';
import React, { useMemo, useRef } from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';
import DeleteLineAccountButton from '../delete-line-account-button/DeleteLineAccountButton';
import LineAccountTooltip from '../line-account-tooltip/LineAccountTooltip';

export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

const LineAccountFormSchema = Yup.object().shape({
  percentage: Yup.number()
    .min(0.01, 'Cannot be zero')
    .max(100, 'Maximum is 100%')
    .required('Required'),
});

export const LineAccount = ({ lineAccount, line }: LineAccountProps) => {
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  const skipFormikInit = useRef(true);
  const percentage = computePercentageGivenAmount(lineAccount, line);

  const saveLineAccount = async (newPercentage: number) => {
    const newAmount = computeAmountGivenPercentage({
      linePrice: line.price,
      lineQuantity: line.quantity,
      lineTax: 0,
      lineAccountPercentage: newPercentage,
    });
    console.log(`🚀  newAmount:`, newAmount);
    await updateCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      id: lineAccount.id,
      amount: newAmount,
    });
  };
  // const saveLineAccount = useCallback(async () => {
  // }, [
  //   line.cartId,
  //   line.id,
  //   line.price,
  //   line.quantity,
  //   lineAccount.id,
  //   updateCartLineAccount,
  // ]);

  return (
    <Formik
      initialValues={{
        percentage: percentage,
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        if (!skipFormikInit.current) {
          console.log(`🚀  values:`, values);
          await saveLineAccount(values.percentage);
          console.log(`🔵 🔵 🔵 🔵 🔵 🔵  ~ FORMIK onSubmit!`);
        }
        skipFormikInit.current = false;
      }}
    >
      {({ errors, touched }) => (
        <InputGroup maxWidth="400px">
          <LineAccountTooltip accountNumber={lineAccount.accountNumber}>
            <InputLeftAddon
              children={
                <HStack cursor={'help'}>
                  <Box data-testid="lineAccountNumber">
                    <strong>#</strong> {lineAccount.accountNumber}
                  </Box>
                  <Badge
                    rounded="md"
                    shadow="xs"
                    ml={2}
                    mt={-0.5}
                    variant="warning"
                    data-testid="lineAccountAmount"
                    bg="yellow.100"
                  >
                    {toFriendlyCurrency(lineAccount.amount)}
                  </Badge>
                  <DeleteLineAccountButton
                    lineAccount={lineAccount}
                    line={line}
                  />
                </HStack>
              }
            />
          </LineAccountTooltip>
          <TooltipMC
            isHidden={areLineAccountsValid(line)}
            label={
              areLineAccountsValid(line)
                ? ''
                : '🛑 Number must be greater than 0 and less than 100, and percentages should sum to exactly 100'
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
              <AutoSave debounceMs={300} />
            </Box>
          </TooltipMC>
          <InputRightAddon children={<PercentageIcon />} />
        </InputGroup>
      )}
    </Formik>
  );
};

export default LineAccount;
