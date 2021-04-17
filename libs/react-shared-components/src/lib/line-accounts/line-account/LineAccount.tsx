import { Badge, Box, HStack, InputGroup, InputLeftAddon, InputRightAddon, Tooltip } from '@chakra-ui/react';
import { CartLine, CartLineAccount, useAccountsQuery, useDeleteCartLineAccountMutation, useUpdateCartLineAccountMutation } from '@multi-cart/react-data-access';
import { AutoSave } from '@multi-cart/react-shared-components';
import { InputField } from '@multi-cart/react-ui';
import { computeAmountGivenPercentage, getRemainingPercentage, toFriendlyCurrency } from '@multi-cart/util';
import { Form, Formik } from "formik";
import React, { useEffect, useRef } from 'react';
import { FaPercentage as PercentageIcon } from 'react-icons/fa';
import { TiDelete as DeleteIcon } from 'react-icons/ti';
import 'regenerator-runtime/runtime';
import * as Yup from 'yup';

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
  const [{ data: dataAccount, fetching: fetchingAccount }] = useAccountsQuery(); // NOTE: this is instead of adding in one more leftJoinAndSelect() to all the cart/carts queries, etc...
  const percentage = useRef(getRemainingPercentage(line, lineAccount.id));

  // ------------------- update LA.AMOUNT when line.price|qty changes!
  useEffect(() => {
    async function saveCLA() {
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
    saveCLA();
  }, [line.id, line.cartId, line.price, line.quantity, updateCartLineAccount, lineAccount.id]);


  return (
    <Formik
      initialValues={{
        percentage: percentage.current
      }}
      validationSchema={LineAccountFormSchema}
      onSubmit={async (values) => {
        // 1. calculate new AMOUNT based on this NEW percentage
        // 2. and must update the actual percentage ref (our "view model")
        // 3. update the DB 
        const newAmount = computeAmountGivenPercentage({
          linePrice: line.price,
          lineQuantity: line.quantity,
          lineTax: 0,
          lineAccountPercentage: values.percentage
        });
        percentage.current = values.percentage;
        await updateCartLineAccount({
          id: lineAccount.id,
          amount: newAmount,
          cartId: line.cartId,
          cartLineId: line.id,
        });

      }}>
      {({ /*isSubmitting, values, setValues,*/ errors, touched }) => (
        <Form>
          <InputGroup maxWidth="400px">

            {/* LEFT PART */}
            <Tooltip

              hasArrow
              label={dataAccount?.accounts && dataAccount.accounts.find(a => a.accountNumber === lineAccount.accountNumber).accountName}
              bg="gray.300"
              color="black">
              <InputLeftAddon children={<HStack cursor={'help'} >
                <Box><strong>#</strong> {lineAccount.accountNumber}</Box>
                <Badge
                  rounded="md"
                  shadow="xs"
                  ml={2}
                  mt={-.5}
                  variant="warning"
                  bg="yellow.100">{toFriendlyCurrency(lineAccount.amount)}</Badge>
                <DeleteIcon size="16" cursor={'pointer'} color="red" onClick={() => deleteCartLineAccount({ cartLineAccountId: lineAccount.id })} />
              </HStack >} />
            </Tooltip>

            {/* INPUT for PERCENTAGE */}
            <Box minW="60px" maxW="80px">
              {/* style={(errors.percentage && touched.percentage) ? { "border": "2px dotted red" } : null} */}
              <InputField
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
