import React from 'react';
import './LandingLayout.module.scss';
import { Flex } from "@chakra-ui/react";
import { Footer, Header } from "@multi-cart/react-shared-components";


// --------------
// NOTE: This component will always render the header, the footer, and any components that are passed as children.
//              - Each page renders a layout and consists of many sections. 
//              - Every section component takes as props its main variables (text, images, links), 
//              - so it's super easy to customize your pages...
// --------------


/* eslint-disable-next-line */
export interface LandingLayoutProps {
  children?: React.ReactNode;
}

export function LandingLayout(props: LandingLayoutProps) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />
      {props.children}
      <Footer />
    </Flex>
  );
}

export default LandingLayout;