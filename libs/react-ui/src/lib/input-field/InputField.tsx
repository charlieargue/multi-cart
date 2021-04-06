import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
// 🔴 WIP: don't know how to make this work import 
// import './InputField.module.css';

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
export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  muted,
  size: _,
  unwrapped = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const jsxField = <Form.Control {...field} {...props} id={id ? id : field.name} />;

  if (field.value !== null && props.value !== null) {
    if (!unwrapped) {
      return (
        <Form.Group>
          {/* <div className="testing">✊ Hi</div> */}
          {
            label && (
              jsxField
            )
          }
          <Form.Control {...field} {...props} id={id ? id : field.name} />
          {
            muted && (
              <Form.Text className="text-muted">{muted}</Form.Text>
            )
          }
        </Form.Group>
      );
    } else {
      return (jsxField);
    }
  }
  return null;
};
export default InputField;