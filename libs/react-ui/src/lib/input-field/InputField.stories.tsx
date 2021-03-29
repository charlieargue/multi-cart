
import { storiesOf } from "@storybook/react";
import { text } from '@storybook/addon-knobs';
import React from 'react';
import { InputField, InputFieldProps } from './InputField';
import withFormik from 'storybook-formik';


// CSF storybook-form example:
export default {
  title: 'InputField',
  component: InputField,
};

const config = {
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        value: "dupa",
        label: "pupa",
        name: "kupa",
        muted: false
      }
    }
  }
};

// -------------------
export const primary = () => {
  const props: InputFieldProps = {
    name: text("name", ""),
    label: text("label", "defaut label: "),
  };
  return <InputField label={props.label} name={props.name} />;
};
primary.story = config;


// -------------------
export const secondary = () => {
  const props: InputFieldProps = {
    name: text("name", ""),
    label: text("label", "secondary label: "),
  };
  return <InputField label={props.label} name={props.name} />;
};

secondary.story = config;

// storiesOf("InputField", module)
//   .addDecorator(withFormik)
//   // -------------------
//   .add("empty", () => {
//     const props: InputFieldProps = {
//       name: text("name", ""),
//       label: text("label", ""),
//     };
//     return <InputField name={props.name} />;
//   }, initialValues)
//   // -------------------
//   .add("withLabel", () => {
//     const props: InputFieldProps = {
//       name: text("name", ""),
//       label: text("label", "sweet"),
//     };
//     return <InputField label={props.label} name={props.name} />;
//   }, initialValues);


