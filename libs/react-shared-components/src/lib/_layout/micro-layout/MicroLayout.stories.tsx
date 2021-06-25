import React from 'react';
import MicroLayout from './MicroLayout';

export default {
  component: MicroLayout,
  title: 'MicroLayout',
};

export const primary = () => {
  return <MicroLayout
    heading={<> Enter a New Password</>}
    subHeading={<span><span role='img' aria-label='emoji'>🔐 </span>And then <strong>login</strong> into your account again, please!</span>}>
    Testing MicroLayout
</MicroLayout >;
};
