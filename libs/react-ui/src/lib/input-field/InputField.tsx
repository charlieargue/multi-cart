import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  name: string;
  muted?: React.ReactNode;
  unwrapped?: boolean;
  radius?: string;
  ref?: (node: HTMLInputElement) => void;
} & InputProps;

export const InputField = ({
  id,
  label,
  muted,
  size: _,
  unwrapped = false,
  radius = 'md',
  ...props
}: InputFieldProps) => {
  const [field] = useField(props);
  const jsxLabel = <FormLabel>{label}</FormLabel>;
  const jsxField = (
    <Input
      p={2}
      color={mode('inherit', 'gray.900')}
      borderRadius={radius}
      {...field}
      {...props}
      id={id ? id : field.name}
    />
  );

  if (field.value !== null && props.value !== null) {
    if (!unwrapped) {
      return (
        <FormControl id={id}>
          {label ? (
            <>
              {jsxLabel}
              {jsxField}
            </>
          ) : (
            jsxField
          )}
          {muted && <FormHelperText>{muted}</FormHelperText>}
        </FormControl>
      );
    } else {
      return jsxField;
    }
  }
  return null;
};
export default InputField;
