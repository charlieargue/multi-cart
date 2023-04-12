// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Flex } from "@chakra-ui/react";
import { Wrapper } from "@multi-cart/react-ui";
import React from 'react';
import DarkModeSwitch from "../../dark-mode-switch/DarkModeSwitch";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import './LandingLayout.module.scss';

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
    <Wrapper data-testid="bkgndAppLayout">
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