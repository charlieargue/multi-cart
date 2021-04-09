import { RegistrationForm } from '@multi-cart/react-shared-components';
import React from 'react';
import { MicroLayout } from '@multi-cart/react-shared-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RegisterContainerProps {

}

export const RegisterContainer = () => {
  return (
    <MicroLayout
      heading={<><span role='img' aria-label='emoji'>👋 </span> Register Your Account!</>}
      subHeading={<span>🛡 Your <strong>email is safe</strong> with us</span>} >
      <RegistrationForm />
    </MicroLayout >
  );
}
