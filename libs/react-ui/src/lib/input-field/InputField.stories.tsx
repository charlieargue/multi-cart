
import { storiesOf } from "@storybook/react";
import { text } from '@storybook/addon-knobs';
import React from 'react';
import { InputField, InputFieldProps } from './InputField';
import withFormik from 'storybook-formik';


// CSF:
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
export const secondary = () => {
  const props: InputFieldProps = {
    name: text("name", ""),
    label: text("label", "secondary label: "),
    value: "vv",
  };
  return <InputField value={props.value} label={props.label} name={props.name} />;
};

secondary.story = config;


