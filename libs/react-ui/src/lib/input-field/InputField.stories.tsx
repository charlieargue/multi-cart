import { text } from '@storybook/addon-knobs';
import React from 'react';
import withFormik from 'storybook-formik';
import { InputField, InputFieldProps } from './InputField';


export default {
  title: 'InputField',
  component: InputField,
};


// -------------------
export const withDefaultState = () => {
  const props: InputFieldProps = {
    name: text("name", ""),
    label: text("label", "defaut label: "),
    value: "aa",
  };
  return <InputField value={props.value} label={props.label} name={props.name} />;
};
withDefaultState.decorators = [withFormik];
withDefaultState.parameters = {
  formik: {
    initialValues: {
      label: "bb",
      name: "cc",
      muted: false
    }
  }
};


// -------------------
export const withSecondary = () => {
  const props: InputFieldProps = {
    name: text("name", ""),
    label: text("label", "secondary label: "),
    value: "vv",
  };
  return <InputField value={props.value} label={props.label} name={props.name} />;
};

withSecondary.decorators = [withFormik];
withSecondary.parameters = {
  formik: {
    initialValues: {
      label: "bb",
      name: "cc",
      muted: false
    }
  }
};


