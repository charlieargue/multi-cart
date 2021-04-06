import { computeAmountGivenPercentage, getRemainingPercentage, toFriendlyCurrency } from '@multi-cart/multi-cart/util';
import { CartLine, CartLineAccount, useAccountsQuery, useDeleteCartLineAccountMutation, useUpdateCartLineAccountMutation } from '@multi-cart/react-data-access';
import { AutoSave } from '@multi-cart/react-shared-components';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Badge, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
// import './LineAccount.module.scss';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setErrors(errors: string[]): void;
}

const LineAccountFormSchema = Yup.object().shape({
  percentage: Yup.number()
    .min(.01, 'Cannot be zero')
    .max(100, 'Maximum is 100%')
    .required('Required'),
});

const stylesGroup = { maxWidth: "400px" };

// -------------------
export const LineAccount: React.FC<LineAccountProps> = ({ lineAccount, line, setErrors }) => {
  const [, deleteCartLineAccount] = useDeleteCartLineAccountMutation();
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  const [{ data: dataAccount, fetching: fetchingAccount }] = useAccountsQuery(); // NOTE: this is instead of adding in one more leftJoinAndSelect() to all the cart/carts queries, etc...
  const percentage = useRef(getRemainingPercentage(line, lineAccount.id));
  const laAmount = useRef('');

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
        id: lineAccount.id,
        amount: newAmount
      });
    }
    saveCLA();
  }, [line.price, line.quantity, updateCartLineAccount, lineAccount.id]);


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
          amount: newAmount
        });

      }}>
      {({ isSubmitting, values, setValues, errors, touched }) => (
        <Form className="ml-3" style={{ "width": "300px" }}>
          <InputGroup className="mb-3 ml-3" style={stylesGroup} size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>
                {/* DEBUGGING: <Badge variant="warning" className="mr-2 px-2">{lineAccount.id}</Badge> */}
                <OverlayTrigger
                  overlay={<Tooltip id={`tooltip_account_name_${lineAccount.id}`}>{dataAccount?.accounts && dataAccount.accounts.find(a => a.accountNumber === lineAccount.accountNumber).accountName}</Tooltip>}>
                  <span className="cursor-hand"><strong>#</strong> {lineAccount.accountNumber}</span>
                </OverlayTrigger>

                <Badge style={{ backgroundColor: "#FDF198" }} variant="warning" className="ml-2 px-2 py-1 fw-light text-reset">{toFriendlyCurrency(lineAccount.amount)}</Badge>
                <X
                  size={18}
                  className="text-danger fw-bold align-text-bottom ml-1 cursor-hand"
                  onClick={() => deleteCartLineAccount({ cartLineAccountId: lineAccount.id })} />
              </InputGroup.Text>
            </InputGroup.Prepend>

            {/* unwrapped INPUT FIELD */}
            <InputField
              type="number"
              aria-label="percentage"
              name="percentage"
              id={`percentage_${lineAccount.id}`}
              unwrapped={true}>
            </InputField>
            <AutoSave debounceMs={300} />
            <InputGroup.Append>
              <InputGroup.Text><strong>%</strong></InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          {
            (errors.percentage && touched.percentage) && setErrors([errors.percentage])
          }

        </Form>
      )}
    </Formik>
  );
}

export default LineAccount;
