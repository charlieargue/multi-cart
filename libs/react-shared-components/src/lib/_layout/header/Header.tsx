import React from "react";
import { Box, Flex, Text, Button, useColorModeValue as mode } from "@chakra-ui/react";
import { Logo } from "@multi-cart/react-ui";
import NextLink from 'next/link';
import { CgClose as CloseIcon } from 'react-icons/cg';

// TODO: componentize
const MenuItem = ({ children, isLast = false, to = "/", ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      color={mode('black', 'white')}
      display="block"
      {...rest}
    >

      <NextLink href={to}>{children}</NextLink>
    </Text>
  );
};


const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

export const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["black", "black", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
        <Logo />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/register">Register</MenuItem>
          <MenuItem to="/login" isLast>
            <Button
              size="sm"
              rounded="md"
              bg="pink"
              color="#B53526"
              _hover={{
                bg: "pink.500",
                color: "white"
              }}
            >
              <span role='img' aria-label='emoji'>🛡</span>&nbsp;&nbsp;Login
            </Button>
          </MenuItem>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
