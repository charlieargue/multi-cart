import React from 'react';
import { ModalComponent, ModalComponentProps } from './ModalComponent';

export default {
  component: ModalComponent,
  title: 'ModalComponent',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: ModalComponentProps = {
    onHide: () => { console.log('✊')}
  };

  return <ModalComponent onHide={props.onHide} />;
};
