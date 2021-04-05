import { calculateDistributionAmount, computeAmountGivenPercentage, getRemainingPercentage, toFriendlyCurrency } from '@multi-cart/multi-cart/util';
import { CartLine, CartLineAccount, useUpdateCartLineAccountMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { Badge, InputGroup } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { AutoSave } from '@multi-cart/react-shared-components';
// import './LineAccount.module.scss';

/* eslint-disable-next-line */
export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

const stylesGroup = { maxWidth: "400px" };

// -------------------
export const LineAccount: React.FC<LineAccountProps> = ({ lineAccount, line }) => {
  const [, updateCartLineAccount] = useUpdateCartLineAccountMutation();
  const percentage = useRef(getRemainingPercentage(line, lineAccount.id));
  const laAmount = useRef('');
  const thisCartLineAccountId = lineAccount.id; // NOTE: this way, not passing in lineAccount.id into useEffect hence lineAccount not in DepArray

  // ------------------- PERCENTAGE
  // useEffect(() => {
  //   if (!skipThisUpdate) {

  //     console.log('🔥 useEffect 4 PERCENTAGE');
  //     // FOCUS JUST ON PERCENTAGE FIRST.
  //     // ATTN: this has to compute based on STATE, not what is passed in as props!
  //     percentage.current = getRemainingPercentage(line, thisCartLineAccountId);
  //     // `lineAccount #${thisCartLineAccountId} has changed!`, lineAccount.amount, DECOMISH 
  //     // console.group([
  //     //   "🚀 ~ percentage.current", percentage.current,
  //     //   "🚀 ~ lineAccount.id", thisCartLineAccountId,
  //     //   "🚀 ~ line", line
  //     // ]);
  //   }

  // }, [line.price, line.quantity, line, thisCartLineAccountId, skipThisUpdate]);


  // ------------------- just the AMOUNT!
  useEffect(() => {
    console.log('🔥 useEffect 4 AMOUNT');
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
      console.log(`🔥 ~ percentage.current`, percentage.current);
      console.log(`🔥 useEffect 🔥 ~ newAmount`, newAmount);
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

        // 🔴 we need to recalc the percentages too!
        percentage: percentage.current
      }}
      // enableReinitialize
      onSubmit={async (values) => {
        // 1. calculate new AMOUNT based on this NEW percentage
        // 2. update the DB 
        const newAmount = computeAmountGivenPercentage({
          linePrice: line.price,
          lineQuantity: line.quantity,
          lineTax: 0,
          lineAccountPercentage: values.percentage
        });
        console.log(`🔴 FORMIK ~ newAmount`, newAmount);
        // and must update the actual percentage ref (our "view model")
        percentage.current = values.percentage;
        await updateCartLineAccount({
          id: lineAccount.id,
          amount: newAmount
        });

      }}>
      {({ isSubmitting, values, setValues }) => (
        <Form className="ml-3" style={{ "width": "350px" }}>
          <InputGroup className="mb-3 ml-3" style={stylesGroup} size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <Badge variant="warning" className="mr-2 px-2">{lineAccount.id}</Badge>
                <strong>#</strong> {lineAccount.accountNumber}
                <Badge style={{ backgroundColor: "#ccc" }} variant="success" className="ml-2 px-2 py-1 fw-light text-reset">{toFriendlyCurrency(lineAccount.amount)}</Badge>
                <X size={18} className="text-danger fw-bold align-text-bottom ml-1 cursor-hand" />
              </InputGroup.Text>
            </InputGroup.Prepend>

            {/* unwrapped INPUT FIELD */}
            <InputField
              type="text"
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
        </Form>
      )}
    </Formik>
  );
}

export default LineAccount;
