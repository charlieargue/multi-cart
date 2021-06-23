import { text } from '@storybook/addon-knobs';
import React from 'react';
import { TextMuted, TextMutedProps  } from './TextMuted';

export default {
  component: TextMuted,
  title: 'TextMuted'
};

export const primary = () => {
  
  
  const props:TextMutedProps = {
    children: <>hello</>,
    style: {},
    fontSize: text('fontSize', ''),
  };
  

  return <TextMuted children = {props.children} style = {props.style} fontSize = {props.fontSize}  />;
};