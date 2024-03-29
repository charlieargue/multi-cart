import {
  Badge,
  Box,
  HStack,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { CartLine, CartLineAccount } from '@multi-cart/react-data-access';
import {
  computePercentageGivenAmount,
  toFriendlyCurrency,
} from '@multi-cart/util';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';
import {
  SaveLineAccountFnType,
  SetPercentageMapType,
} from '../../cart/cart-line-container/CartLineContainer';
import DeleteLineAccountButton from '../delete-line-account-button/DeleteLineAccountButton';
import LineAccountTooltip from '../line-account-tooltip/LineAccountTooltip';
import LineAccountPercentageInput from './LineAccountPercentageInput';

export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
  saveLineAccount: SaveLineAccountFnType;
  setPercentageMap: SetPercentageMapType;
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
  setPercentageMap,
}: LineAccountProps) => {
  const skipFormikInit = useRef(true);
  const derivedPercentage = computePercentageGivenAmount(lineAccount, line);

  useEffect(() => {
    setPercentageMap((state) => ({
      ...state,
      [lineAccount.id]: derivedPercentage,
    }));
  }, []);

  return (
    <Formik
      initialValues={{
        percentage: derivedPercentage,
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        if (!skipFormikInit.current) {
          setPercentageMap((state) => ({
            ...state,
            [lineAccount.id]: values.percentage,
          }));
          await saveLineAccount(values.percentage, lineAccount.id, line);
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
                    setPercentageMap={setPercentageMap}
                  />
                </HStack>
              }
            />
          </LineAccountTooltip>
          <LineAccountPercentageInput lineAccount={lineAccount} line={line} />
          <AutoSave debounceMs={50} />
        </InputGroup>
      )}
    </Formik>
  );
};

export default LineAccount;
