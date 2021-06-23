import { text } from '@storybook/addon-knobs';
import React from 'react';
import { TextMuted, TextMutedProps } from './TextMuted';

export default {
  component: TextMuted,
  title: 'TextMuted'
};


// -------------------
export const withDefaultState = () => {
  return <TextMuted children="default" />;
}

// -------------------
export const withFontSize = () => {

  const props: TextMutedProps = {
    children: "hello world",
    fontSize: "45px",
  };

  return <TextMuted children={props.children} fontSize={props.fontSize} />;
};

// -------------------
export const withStyles = () => {

  const props: TextMutedProps = {
    children: "with styles",
    style: {
      "text-transform": "uppercase",
      "textAlign": "right"
    },
    fontSize: "45px",
  };

  return <TextMuted children={props.children} style={props.style} fontSize={props.fontSize} />;
};