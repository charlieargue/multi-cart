import { text } from '@storybook/addon-knobs';
import React from 'react';
import withFormik from 'storybook-formik';
import { InputField, InputFieldProps } from './InputField';


export default {
  title: 'InputField',
  component: InputField,
};

const config = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        label: "bb",
        name: "cc",
        muted: false
      }
    }
  }
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
withDefaultState.story = config;


// -------------------
export const withSecondary = () => {
  const props: InputFieldProps = {
    name: text("name", ""),
    label: text("label", "secondary label: "),
    value: "vv",
  };
  return <InputField value={props.value} label={props.label} name={props.name} />;
};

withSecondary.story = config;


