import React from 'react';
import { TextMuted, TextMutedProps } from './TextMuted';

export default {
  component: TextMuted,
  title: 'TextMuted'
};



// -------------------
export const withDefaultState = () => {
  return <>
    <TextMuted children="default" />
    <TextMuted children="just muted text" />
  </>;
}

// -------------------
export const withFontSize = () => {

  return <>
    <TextMuted fontSize="45px">45 px size</TextMuted>
    <TextMuted fontSize="25px">25 px size</TextMuted>
    <TextMuted fontSize="15px">15 px size</TextMuted>
  </>;
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