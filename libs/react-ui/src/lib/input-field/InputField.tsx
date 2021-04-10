import { Box, FormControl, FormHelperText, FormLabel, Input, InputProps, useColorModeValue as mode, } from '@chakra-ui/react';
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
  radius?: string;
  ref?: (node: HTMLInputElement) => void;
}
  & InputProps
  // TODO: hacky, but confused on merging in input prop types for Chakra + Password useRef + Formik to work...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  & any;


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
  radius = "md",
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(props);
  const jsxLabel = (<FormLabel>{label}</FormLabel>);
  const jsxField = (<Input borderRadius={radius}  {...field} {...props} id={id ? id : field.name} />);

  if (field.value !== null && props.value !== null) {
    if (!unwrapped) {
      return (
        <FormControl id={id}>
          {label ? <>{jsxLabel}{jsxField}</> : jsxField}
          {muted && (
            <FormHelperText>{muted}</FormHelperText>
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