import { Badge, Box, HStack, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { CartLine, CartLineAccount, useUpdateCartLineAccountMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { areLineAccountsValid, computeAmountGivenPercentage, computePercentageGivenAmount, toFriendlyCurrency } from '@multi-cart/util';
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef } from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';
import DeleteLineAccountButton from '../delete-line-account-button/DeleteLineAccountButton';
import LineAccountTooltip from '../line-account-tooltip/LineAccountTooltip';


// -------------------
// OVERVIEW of DILEMMA:
// - we show on the UI the percentage, and that's what the user changes
// - but we don't store it in the db, it's just a view model
// - on the db we store the computed amount (an actual field, not vm))
// -------------------

/* eslint-disable-next-line */
export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

const LineAccountFormSchema = Yup.object().shape({
  percentage: Yup.number()
    .min(.01, 'Cannot be zero')
    .max(100, 'Maximum is 100%')
    .required('Required'),
});

// -------------------
export const LineAccount = ({ lineAccount, line }: LineAccountProps) => {
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  const initializingForUseEffect = useRef(true);
  const initializingForFormik = useRef(true);
  // NOTE: using useRef because don't want changes to percentage to trigger re-renders (afaik)
  // NOTE: auto-computing remaining percentage done implicitly on New CLA Button Side (see LineAccountsCOntainer), const remainingAmount = getRemainingAmount(line)
  const percentage = useRef(computePercentageGivenAmount(lineAccount, line));

  const saveLineAccount = useCallback(async () => {
    const newAmount = computeAmountGivenPercentage({
      linePrice: line.price,
      lineQuantity: line.quantity,
      lineTax: 0,
      lineAccountPercentage: percentage.current
    });
    await updateCartLineAccount({
      cartId: line.cartId,
      cartLineId: line.id,
      id: lineAccount.id,
      amount: newAmount
    });
  },
    [line.cartId, line.id, line.price, line.quantity, lineAccount.id, updateCartLineAccount],
  )

  // ------------------- update LA.AMOUNT when line.price|qty changes!
  // • anytime line.price or line.quantity changes
  // • need to hit a) calculate new AMOUNT for this LA
  // • and hit the DB saving that!
  // CONFIRMED: graphe-cache IS automatically updating lineAccount.amount after database update!
  useEffect(() => {
    // need to skip first call during loading
    if (initializingForUseEffect.current === false) {
      console.log(`🟡 🟡 🟡 🟡  ~ USE EFFECT!`);
      saveLineAccount();
    }
    initializingForUseEffect.current = false; // but now that skipped, make sure not initializing anymore
  }, [line.price, line.quantity, saveLineAccount]);


  return (
    <Formik
      initialValues={{
        percentage: percentage.current
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        // don't over fire when Formik hydrates form
        if (!initializingForFormik.current) {
          console.log(`🔵 🔵 🔵 🔵 🔵 🔵  ~ FORMIK onSubmit!`);
          // 1. calculate new AMOUNT based on this NEW percentage
          // 2. and must update the actual percentage ref (our "view model")
          // 3. update the DB 
          percentage.current = values.percentage;
          await saveLineAccount()
        }
        initializingForFormik.current = false;
      }}>
      {({ /*isSubmitting, values, setValues,*/ errors, touched }) => (
        <Form>
          <InputGroup maxWidth="400px">

            {/* LEFT PART */}
            <LineAccountTooltip accountNumber={lineAccount.accountNumber}>
              <InputLeftAddon children={<HStack cursor={'help'} >
                <Box><strong>#</strong> {lineAccount.accountNumber}</Box>
                <Badge
                  rounded="md"
                  shadow="xs"
                  ml={2}
                  mt={-.5}
                  variant="warning"
                  bg="yellow.100">{toFriendlyCurrency(lineAccount.amount)}</Badge>
                <DeleteLineAccountButton lineAccount={lineAccount} line={line} />

              </HStack >} />
            </LineAccountTooltip>

            {/* INPUT for PERCENTAGE */}
            <Box minW="60px" maxW="80px">
              <InputField
                style={areLineAccountsValid(line) ? { "border": "1px solid green" } : { "border": "1px solid red" }}
                required
                type="number"
                aria-label="percentage"
                name="percentage"
                id={`percentage_${lineAccount.id}`}
                unwrapped={true}
                radius="none">
              </InputField>
              <AutoSave debounceMs={300} />
            </Box>

            {/* RIGHT PART */}
            <InputRightAddon children={<PercentageIcon />} />
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
}

export default LineAccount;
