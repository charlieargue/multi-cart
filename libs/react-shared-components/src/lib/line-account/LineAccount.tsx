import React from 'react';
import { Badge, FormControl, InputGroup } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { CartLineAccount } from '@multi-cart/react-data-access';
import { Form, Formik } from "formik";
import { InputField } from '@multi-cart/react-ui';
// import './LineAccount.module.scss';

/* eslint-disable-next-line */
export interface LineAccountProps {
  lineAccount: CartLineAccount
}

// TODO: once figure out cssModules issue, move these styles into scss properly
const stylesGroup = { maxWidth: "400px" };

// -------------------
export const LineAccount: React.FC<LineAccountProps> = ({ lineAccount }) => {

  return (
    <Formik
      initialValues={{
        percentage: lineAccount.amount
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
                <Badge style={{ backgroundColor: "#ccc" }} variant="success" className="ml-2 px-2 py-1 fw-light text-reset">$13.99</Badge>
                <X size={18} className="text-danger fw-bold align-text-bottom ml-1 cursor-hand" />
              </InputGroup.Text>
            </InputGroup.Prepend>

            {/* no INPUT FIELD, raw FormControl */}
            {/* DECOMISH / BUGGY: was read-only for some reason, but onChange was firing...
            
            <FormControl
              type="text"
              aria-label="percentage"
              name="percentage"
              id="percentage"
              value={values.percentage}
              onChange={() => {
                console.log('change');
              }}
            /> */}
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
