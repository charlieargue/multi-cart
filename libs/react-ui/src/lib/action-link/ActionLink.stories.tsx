import React from 'react';
import Banner from '../banner/Banner';
import { ActionLink } from './ActionLink';

export default {
  component: ActionLink,
  title: 'ActionLink',
};

export const primary = () => {
  return <Banner
    actionLink={<ActionLink nexthref="/" w={{ base: 'full', sm: 'auto' }} flexShrink={0}>Go back to homepage.</ActionLink>}
    text="🛡 If an account with that email exists, we sent you an email!"></Banner>;
};
