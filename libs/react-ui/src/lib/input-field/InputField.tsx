import { Box, FormControl, FormLabel, Input, useColorModeValue as mode, } from '@chakra-ui/react';
import { Form, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
// import { Form } from "react-bootstrap";
import styles from './InputField.module.css';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  name: string;
  muted?: React.ReactNode;
  unwrapped?: boolean;
};


// thx: https://formik.org/docs/api/useField
// TODO: {/* {meta.touched && meta.error ? ( 
//    <div className="error">{meta.error}</div>
//  ) : null}
// */}
export const InputField = ({
  id,
  label,
  muted,
  size: _,
  unwrapped = false,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(props);
  // const jsxLabel = <Form.Label className="text-muted"></Form.Label>;
  // const jsxField = <Form.Control {...field} {...props} id={id ? id : field.name} />;
  const jsxLabel = <FormLabel>{label}</FormLabel>;
  const jsxField = <Input {...field} {...props} id={id ? id : field.name} />;

  if (field.value !== null && props.value !== null) {
    if (!unwrapped) {
      return (
        <FormControl id={id}>
          {label ? <>{jsxLabel}{jsxField}</> : jsxField}
          {muted && (
            <Box as="a" color={mode('blue.600', 'blue.200')} fontWeight="semibold" fontSize="sm">
              {muted}
            </Box>
          )}
        </FormControl >
      );
    } else {
      return (jsxField);
    }
  }
  return null;
};
export default InputField;