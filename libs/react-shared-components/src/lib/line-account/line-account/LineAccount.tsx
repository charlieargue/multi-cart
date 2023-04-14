// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import {
  Badge,
  Box,
  HStack,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import {
  CartLine,
  CartLineAccount,
  useUpdateCartLineAccountMutation,
} from '@multi-cart/react-data-access';
import {
  computeAmountGivenPercentage,
  computePercentageGivenAmount,
  toFriendlyCurrency,
} from '@multi-cart/util';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import DeleteLineAccountButton from '../delete-line-account-button/DeleteLineAccountButton';
import LineAccountTooltip from '../line-account-tooltip/LineAccountTooltip';
import LineAccountPercentageInput from './LineAccountPercentageInput';

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
  const derivedPercentage = computePercentageGivenAmount(lineAccount, line);
  
  const saveLineAccount = async (newPercentage: number) => {
    const newAmount = computeAmountGivenPercentage({
      linePrice: line.price,
      lineQuantity: line.quantity,
      lineTax: 0,
      lineAccountPercentage: newPercentage,
    });
    await updateCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      id: lineAccount.id,
      amount: newAmount,
    });
  };

  return (
    <Formik
      initialValues={{
        percentage: derivedPercentage,
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        if (!skipFormikInit.current) {
          await saveLineAccount(values.percentage);
        }
        skipFormikInit.current = false;
      }}
    >
      {() => (
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
          <LineAccountPercentageInput lineAccount={lineAccount} line={line} />
        </InputGroup>
      )}
    </Formik>
  );
};

export default LineAccount;
