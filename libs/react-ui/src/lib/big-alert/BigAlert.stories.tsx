import React from 'react';
import { Wrapper } from '../wrapper/Wrapper';
import { BigAlert } from './BigAlert';

export default {
  component: BigAlert,
  title: 'BigAlert',
};


export const withError = () => {
  return (<BigAlert type="error" title="Ooops, sorry! An error occurred:">
    <BigAlert.Message>
      Sample error message
    </BigAlert.Message>
  </BigAlert>);
};

export const withWarning = () => {
  return (<Wrapper><BigAlert type="warning" title="Sorry...">
    <BigAlert.Message>
      Unfortunately, we could not find this cart!
  </BigAlert.Message>
  </BigAlert></Wrapper>);
};