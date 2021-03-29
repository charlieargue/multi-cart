import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
// 🔴 WIP: don't know how to make this work import 
// import './InputField.module.css';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  muted?: React.ReactNode;
};

// thx: https://formik.org/docs/api/useField
// TODO: {/* {meta.touched && meta.error ? ( 
//    <div className="error">{meta.error}</div>
//  ) : null}
// */}
export const InputField: React.FC<InputFieldProps> = ({
  label,
  muted,
  size: _,
  ...props
}) => {
  const [field, meta] = useField(props);

  if (field.value !== null && props.value !== null) {
    return (
      <Form.Group>
        {/* <div className="testing">✊ Hi</div> */}
        {
          label && (
            <Form.Label className="text-muted">{label}</Form.Label>
          )
        }
        <Form.Control {...field} {...props} id={field.name} />
        {
          muted && (
            <Form.Text className="text-muted">{muted}</Form.Text>
          )
        }
      </Form.Group>
    );
  }
  return null;
};
export default InputField;