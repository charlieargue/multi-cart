import { Flex } from '@chakra-ui/react';
import { DarkModeSwitch, Footer, Header, NavBar } from '@multi-cart/react-shared-components';
import React from 'react';
import { Wrapper } from "@multi-cart/react-ui";
import './AppLayout.module.scss';

interface AppLayoutProps {
  children?: React.ReactNode
}

/**
 * Layout for Application pages that require authentication (eg. Dashboard, EditCart, etc.)
 *
 */
export const AppLayout = (props: AppLayoutProps) => {
  return (
    // <Container fluid className="mx-0 px-0">
    //   <NavBar />
    //     {children}
    // </Container>
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