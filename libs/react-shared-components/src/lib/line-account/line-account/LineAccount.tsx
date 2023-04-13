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
import { InputField } from '@multi-cart/react-ui';
import {
  areLineAccountsValid,
  computeAmountGivenPercentage,
  computePercentageGivenAmount,
  toFriendlyCurrency,
} from '@multi-cart/util';
import { Form, Formik } from 'formik';
import React, { useCallback, useEffect, useRef } from 'react';
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
  const skipFormikInit = useRef(true);
  const percentage = computePercentageGivenAmount(lineAccount, line);

  return (
    <Formik
      initialValues={{
        percentage: percentage,
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        if (!skipFormikInit.current) {
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
          <InputRightAddon children={<PercentageIcon />} />
        </InputGroup>
      )}
    </Formik>
  );
};

export default LineAccount;
