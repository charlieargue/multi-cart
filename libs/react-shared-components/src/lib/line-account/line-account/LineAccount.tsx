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
import { useCartLineContext } from '@multi-cart/react-app-state';
import { CartLine, CartLineAccount } from '@multi-cart/react-data-access';
import {
  computePercentageGivenAmount,
  toFriendlyCurrency,
} from '@multi-cart/util';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';
import DeleteLineAccountButton from '../delete-line-account-button/DeleteLineAccountButton';
import LineAccountTooltip from '../line-account-tooltip/LineAccountTooltip';
import LineAccountPercentageInput from './LineAccountPercentageInput';

export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
  saveLineAccount(newPercentage: number, lineAccountId: string): void;
}

const LineAccountFormSchema = Yup.object().shape({
  percentage: Yup.number()
    .min(0.01, 'Cannot be zero')
    .max(100, 'Maximum is 100%')
    .required('Required'),
});

export const LineAccount = ({
  lineAccount,
  line,
  saveLineAccount,
}: LineAccountProps) => {
  const skipFormikInit = useRef(true);
  const derivedPercentage = computePercentageGivenAmount(lineAccount, line);
  const dispatch = useCartLineContext();

  useEffect(() => {
    // hydrate percentage map for this line account's initial value
    dispatch({
      type: 'UPDATE_PERCENTAGE_MAP',
      percentageMap: { [lineAccount.id]: derivedPercentage },
    });
  }, []);

  return (
    <Formik
      initialValues={{
        percentage: derivedPercentage,
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        if (!skipFormikInit.current) {
          console.log(
            `🚀 AUTOSAVE because changing PERCENTAGE... updating %map, savingLA ...`
          );
          dispatch({
            type: 'UPDATE_PERCENTAGE_MAP',
            percentageMap: { [lineAccount.id]: values.percentage },
          });

          await saveLineAccount(values.percentage, lineAccount.id);
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
          <AutoSave debounceMs={100} />
        </InputGroup>
      )}
    </Formik>
  );
};

export default LineAccount;
