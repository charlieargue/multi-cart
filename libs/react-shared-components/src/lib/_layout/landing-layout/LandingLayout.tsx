import { Flex } from "@chakra-ui/react";
import { DarkModeSwitch, Footer, Header } from "@multi-cart/react-shared-components";
import { Wrapper } from "@multi-cart/react-ui";
import React from 'react';
import './LandingLayout.module.scss';

/* eslint-disable-next-line */
export interface LandingLayoutProps {
  children?: React.ReactNode;
}


/**
 * Layout for Landing Pages and home page
 *
 * @export
 * @param {LandingLayoutProps} props
 * @return {*} 
 */
export function LandingLayout(props: LandingLayoutProps) {
  
  return (
    <Wrapper>
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
        <DarkModeSwitch />
      </Flex>
    </Wrapper>
  );
}

export default LandingLayout;