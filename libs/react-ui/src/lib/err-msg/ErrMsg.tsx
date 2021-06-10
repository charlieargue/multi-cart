import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export const ErrMsg: React.ComponentType<{children?: React.ReactNode;}> = ({ children }) => {
  return (
    <Box style={{marginTop: "4px"}}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    </Box>
  );
}

export default ErrMsg;