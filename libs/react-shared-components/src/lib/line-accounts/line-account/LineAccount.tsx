import { Badge, Box, HStack, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { CartLine, CartLineAccount, useAccountsQuery, useDeleteCartLineAccountMutation, useUpdateCartLineAccountMutation } from '@multi-cart/react-data-access';
import { InputField, TooltipMC } from '@multi-cart/react-ui';
import { computeAmountGivenPercentage, getRemainingPercentage, getTotalPercentages, toFriendlyCurrency } from '@multi-cart/util';
import { Form, Formik } from "formik";
import React, { useEffect, useRef } from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';
import { TiDelete as DeleteIcon } from 'react-icons/ti';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';

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
  const [, deleteCartLineAccount] = useDeleteCartLineAccountMutation();
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  const [{ data, fetching }] = useAccountsQuery(); // NOTE: this is instead of adding in one more leftJoinAndSelect() to all the cart/carts queries, etc...
  
  // CULPRIT 🔴 and NOT DRY
  const percentage = useRef(getRemainingPercentage(line, lineAccount.id));
  const initializingTrigger1 = useRef(true);
  const initializingTrigger2 = useRef(true);

  // DRY THIS WITH A useReducer (and can you call async calls in)

  // ------------------- update LA.AMOUNT when line.price|qty changes!
  useEffect(() => {

    async function saveCLA() {
      console.log(`🟢 🟢 🟢 🟢 🟢 🟢  ~ useEffect saveCLA() based on EVERYTHING!, initializing.current = ${initializingTrigger1.current}`);
      // • anytime line.price or line.quantity changes
      // • need to hit a) calculate new AMOUNT for this LA
      // • and hit the DB saving that!
      // CONFIRMED: graphe-cache IS automatically updating lineAccount.amount after database update!
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
    }
    if (!initializingTrigger1.current) {
      saveCLA();
    }
    initializingTrigger1.current = false;
  }, [line.id, line.cartId, line.price, line.quantity, updateCartLineAccount, lineAccount.id]);


  return (
    <Formik
      initialValues={{
        percentage: percentage.current
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        // don't over fire when Formik hydrates form
        if (!initializingTrigger2.current) {
          console.log(`🔵 🔵 🔵 🔵 🔵 🔵  ~ FORMIK onSubmit!`);
          // 1. calculate new AMOUNT based on this NEW percentage
          // 2. and must update the actual percentage ref (our "view model")
          // 3. update the DB 
          const newAmount = computeAmountGivenPercentage({
            linePrice: line.price,
            lineQuantity: line.quantity,
            lineTax: 0,
            lineAccountPercentage: values.percentage
          });

          // // CULPRIT 🔴 and NOT DRY and CONFUSING... TODO
          percentage.current = values.percentage;
          await updateCartLineAccount({
            id: lineAccount.id,
            amount: newAmount,
            cartId: line.cartId,
            cartLineId: line.id,
          });
        }
        initializingTrigger2.current = false;

      }}>
      {({ /*isSubmitting, values, setValues,*/ errors, touched }) => (
        <Form>
          <InputGroup maxWidth="400px">

            {/* LEFT PART */}
            <TooltipMC

              label={data?.accounts && data.accounts.find(a => a.accountNumber === lineAccount.accountNumber).accountName}
              >
              <InputLeftAddon children={<HStack cursor={'help'} >
                <Box><strong>#</strong> {lineAccount.accountNumber}</Box>
                <Badge
                  rounded="md"
                  shadow="xs"
                  ml={2}
                  mt={-.5}
                  variant="warning"
                  bg="yellow.100">{toFriendlyCurrency(lineAccount.amount)}</Badge>
                <DeleteIcon size="16" cursor={'pointer'} color="red" onClick={() => deleteCartLineAccount({
                  cartId: line.cartId,
                  cartLineId: line.id,
                  cartLineAccountId: lineAccount.id
                })} />
              </HStack >} />
            </TooltipMC>

            {/* INPUT for PERCENTAGE */}
            <Box minW="60px" maxW="80px">
              <InputField
                style={getTotalPercentages(line) === 100 ? { "border": "1px solid green" } : { "border": "1px solid red" }}
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
