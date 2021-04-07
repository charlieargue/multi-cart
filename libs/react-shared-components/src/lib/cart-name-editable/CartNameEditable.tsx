import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { AutoSave } from '@multi-cart/react-shared-components';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from "formik";
import { useUpdateCartMutation } from '@multi-cart/react-data-access';

// import './CartNameEditable.module.scss';

// TODO: abstract this cmpnt further (with color, size, nothing cart-related) so more re-usable, and move to react-ui

/* eslint-disable-next-line */
export interface CartNameEditableProps {
  name: string;
  id: number;
}

const CartNameEditableFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
});


// -------------------
export function CartNameEditable({ name, id }: CartNameEditableProps) {
  const [, updateCart] = useUpdateCartMutation();
  const [isEditing, setIsEditing] = useState(false);

  // -------------------
  return (
    <h2 onClick={() => isEditing === false ? setIsEditing(!isEditing) : null}>
      <div className="button-editable shadow btn btn-success">
        {isEditing && (

          // EDIT FORM -------------------- start
          <Formik
            initialValues={{
              name
            }}
            validationSchema={CartNameEditableFormSchema}
            onSubmit={async (values) => {
              await updateCart({
                cart: { id, name: values.name }
              });

            }}>
            {({ errors, touched }) => (
              <Form
                style={{ "width": "300px" }}
                onClick={(e) => { e.stopPropagation() }}>

                {/* // style={(errors.percentage && touched.percentage) ? { "border": "2px dotted red" } : null} */}
                {/* unwrapped INPUT FIELD */}
                <InputField
                  type="text"
                  autoFocus
                  aria-label="name"
                  name="name"
                  id={`cartname`}
                  unwrapped={true}
                  onBlur={() => setIsEditing(false)}>
                </InputField>
                <AutoSave debounceMs={300} />
              </Form>
            )}
          </Formik>
          // EDIT FORM -------------------- end

        )}
        {!isEditing && (
          <span>{name}</span>
        )}
      </div>
    </h2>

  );
}

export default CartNameEditable;
