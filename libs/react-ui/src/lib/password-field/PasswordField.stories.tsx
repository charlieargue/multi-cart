import React from 'react';
import { PasswordField } from './PasswordField';
import withFormik from 'storybook-formik';

export default {
  component: PasswordField,
  title: 'PasswordField',
};

export const primary = () => {
  return <PasswordField />;
};
primary.decorators = [withFormik];
primary.parameters = {
  formik: {
    initialValues: {
      label: "bb",
      name: "cc",
      muted: false
    }
  }
};

