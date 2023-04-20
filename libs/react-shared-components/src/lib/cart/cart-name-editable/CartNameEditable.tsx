// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Box, Button } from '@chakra-ui/react';
import { useUpdateCartMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from "formik";
import React, { useState } from 'react';
import * as Yup from 'yup';
import { AutoSave } from '../../auto-save/AutoSave';

export interface CartNameEditableProps {
  name: string;
  id: string;
}

const CartNameEditableFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
});


export const CartNameEditable = ({ name, id }: CartNameEditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [, updateCart] = useUpdateCartMutation();

  return (
    <Box onClick={() => isEditing === false ? setIsEditing(!isEditing) : null} >
      <Button
        data-testid="editableCartName"
        colorScheme="pink"
        size="lg"
        shadow="md"
        borderColor="gray.100"
        height="55px"
        borderWidth="3px"
        bgGradient="linear(to-l, brand.yellow, brand.pink)">
        {isEditing && (
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
            {() => (
              <Form
                onClick={(e) => { e.stopPropagation() }}>
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

        )}
        {!isEditing && (
          <span>{name}</span>
        )}
      </Button>
    </Box>

  );
}

export default CartNameEditable;
