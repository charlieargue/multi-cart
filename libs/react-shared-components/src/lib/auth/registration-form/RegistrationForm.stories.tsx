import React from 'react';
import MicroLayout from '../../_layout/micro-layout/MicroLayout';
import { RegistrationForm } from './RegistrationForm';

export default {
  component: RegistrationForm,
  title: 'RegistrationForm',
};

export const primary = () => {

  return <MicroLayout
    heading={<><span role='img' aria-label='emoji'>👋 </span> Register Your Account!</>}
    subHeading={<span>🛡 Your <strong>email is safe</strong> with us</span>} >
    <RegistrationForm />
  </MicroLayout >;
};