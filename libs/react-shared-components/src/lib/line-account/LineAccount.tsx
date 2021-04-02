import { computePercentage, getRemainingPercentage, toFriendlyCurrency } from '@multi-cart/multi-cart/util';
import { CartLine, CartLineAccount } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from "formik";
import React from 'react';
import { Badge, InputGroup } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
// import './LineAccount.module.scss';

/* eslint-disable-next-line */
export interface LineAccountProps {
  lineAccount: CartLineAccount;
  line: CartLine;
}

// TODO: once figure out cssModules issue, move these styles into scss properly
const stylesGroup = { maxWidth: "400px" };

// -------------------
export const LineAccount: React.FC<LineAccountProps> = ({ lineAccount, line }) => {
  function getAppropriatePercentage(line: CartLine) {
    // IF only 1 LA (in case of just added, it'll be the newly-added one), then compute percentage
    if (line.cartLineAccounts && line.cartLineAccounts.length === 1) {
      return computePercentage(lineAccount, line);
    }
    // IF more than 1 LA, then getRemainingPercentage()
    if (line.cartLineAccounts && line.cartLineAccounts.length > 1) {
      return getRemainingPercentage(line);
    }
    return -1;

  }
  const percentage = getAppropriatePercentage(line);
  console.log("LineAccount 🚀 ~ percentage", percentage);

  return (
    <Formik
      initialValues={{
        percentage//  ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ ✊ 
      }}
      onSubmit={async (values) => {
        // don't over fire when Formik hydrates form
      }}>
      {({ isSubmitting, values }) => (
        <Form className="ml-3" style={{ "width": "300px" }}>
          <InputGroup className="mb-3 ml-3" style={stylesGroup} size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>
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
              id="percentage"
              unwrapped={true}>
            </InputField>

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
