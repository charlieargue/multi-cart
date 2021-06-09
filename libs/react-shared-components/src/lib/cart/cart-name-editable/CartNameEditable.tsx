import { Box, Button } from '@chakra-ui/react';
import { useUpdateCartMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from "formik";
import React, { useState } from 'react';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';

// TODO: UPDATE: NO, see Chakra Editable... abstract this cmpnt further (with color, size, nothing cart-related) so more re-usable, and move to react-ui... 

/* eslint-disable-next-line */
export interface CartNameEditableProps {
  name: string;
  id: string;
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
    <Box onClick={() => isEditing === false ? setIsEditing(!isEditing) : null} >
      <Button
        colorScheme="pink"
        size="lg"
        shadow="lg"
        borderColor="gray.100"
        height="55px"
        borderWidth="3px"
        bgGradient="linear(to-l, brand.yellow, brand.pink)">
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
                onClick={(e) => { e.stopPropagation() }}>

                {/* // style={(errors.percentage && touched.percentage) ? { "border": "2px dotted red" } : null} */}
                {/* unwrapped INPUT FIELD */}
                <InputField
                  style={{ "background": "white", "color": "black" }}
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
      </Button>
    </Box>

  );
}

export default CartNameEditable;
