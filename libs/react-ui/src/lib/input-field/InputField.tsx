import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
// 🔴 WIP: don't know how to make this work import './InputField.module.scss';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  muted?: React.ReactNode;
};

// thx: https://formik.org/docs/api/useField
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
        {/* {meta.touched && meta.error ? ( 
           <div className="error">{meta.error}</div>
         ) : null}
      */}
      </Form.Group>
    );
  }
  return null;
};
