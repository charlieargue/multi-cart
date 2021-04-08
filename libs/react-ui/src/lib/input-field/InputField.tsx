import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
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
  const jsxLabel = <Form.Label className="text-muted">{label}</Form.Label>;
  const jsxField = <Form.Control {...field} {...props} id={id ? id : field.name} />;

  if (field.value !== null && props.value !== null) {
    if (!unwrapped) {
      return (
        <Form.Group>
          {label ? <>{jsxField} {jsxLabel}</> : jsxField}
          {muted && (
            <Form.Text className="text-muted">{muted}</Form.Text>
          )}
        </Form.Group>
      );
    } else {
      return (jsxField);
    }
  }
  return null;
};
export default InputField;