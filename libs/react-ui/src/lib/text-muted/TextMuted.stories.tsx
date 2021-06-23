import { Divider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Wrapper } from '../wrapper/Wrapper';
import { TextMuted, TextMutedProps } from './TextMuted';

export default {
  component: TextMuted,
  title: 'TextMuted'
};

const TextMutedWrapper = ({ children, title }: { children: ReactNode; title?: string; }) => (
  <Wrapper>
    {title && <p style={{ marginBottom: 10 }}>{title}</p>}
    <Divider />
    <div style={{ marginBottom: 20, display: 'block' }}>
      {React.Children.map(children, (child) => (
        <div style={{ marginRight: 20 }}>{child}</div>
      ))}
    </div>
  </Wrapper>
);


// -------------------
export const withDefaultState = () => {
  return <TextMutedWrapper title="Default Style">
    <TextMuted children="default" />
    <TextMuted children="just muted text" />
  </TextMutedWrapper>;
}

// -------------------
export const withFontSize = () => {

  return <TextMutedWrapper title="Font Sizes">
    <TextMuted fontSize="45px">45 px size</TextMuted>
    <TextMuted fontSize="25px">25 px size</TextMuted>
    <TextMuted fontSize="15px">15 px size</TextMuted>
  </TextMutedWrapper>;
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