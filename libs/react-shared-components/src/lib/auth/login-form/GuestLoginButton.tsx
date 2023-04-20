import React from 'react';
import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';
import { TooltipMC } from '@multi-cart/react-ui';

interface GuestLoginButtonProps {
  handleLogin(values?, setErrors?, isGuestLogin?): void;
}

export const GuestLoginButton = ({ handleLogin }: GuestLoginButtonProps) => {
  return (
    <TooltipMC
      label="You won't have to register, but other guests can edit/break your carts at any time! 🙏 &nbsp;And we're not responsible for any content you may see."
      placement="right"
    >
      <Flex
        onClick={() => handleLogin(null, null, true)}
        className="cursor-pointer"
        data-testid="btnGuestLogin"
        bgGradient="linear(to-t, orange, brand.yellow)"
        borderRadius="4px"
        _hover={{
          shadow: 'xl',
          bgGradient: 'linear(to-t, brand.yellow, orange)',
        }}
        shadow="md"
        p={3}
      >
        <Avatar src="/guest.png" />
        <Box ml="3">
          <Text fontWeight="bold">
            Guest Login
            <Badge mb="1" ml="1" colorScheme="pink">
              New
            </Badge>
          </Text>
          <Text fontSize="sm" color="gray.900">
            No registration required!
          </Text>
        </Box>
      </Flex>
    </TooltipMC>
  );
};
