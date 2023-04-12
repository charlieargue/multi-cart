import { Flex } from '@chakra-ui/react';
import { Wrapper, DarkModeSwitch } from '@multi-cart/react-ui';
import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
export interface LandingLayoutProps {
  children?: React.ReactNode;
}

export const LandingLayout = (props: LandingLayoutProps) => {
  return (
    <Wrapper data-testid="bkgndAppLayout">
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: '1200px' }}
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
};

export default LandingLayout;
