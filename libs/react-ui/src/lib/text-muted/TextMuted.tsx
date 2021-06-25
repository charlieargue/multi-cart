import React from 'react';
import {
  Text
} from "@chakra-ui/react";
import './TextMuted.module.scss';

export interface TextMutedProps {
  children?: React.ReactNode;
  style?: unknown;
  fontSize?: string;
}

export function TextMuted(props: TextMutedProps) {
  return (
    <Text
      fontSize={props.fontSize || "xs"}
      mt={2}
      textAlign="center"
      color="primary.800"
      opacity="0.6"
      {...props}
    >{props.children}</Text>
  );
}

export default TextMuted;
