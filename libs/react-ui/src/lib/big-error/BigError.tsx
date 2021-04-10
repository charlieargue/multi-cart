import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { error } from 'console';
import React from 'react';

import './BigError.module.scss';

/* eslint-disable-next-line */
export interface BigErrorProps { }

export type BigErrorMessageProps = {
  children: React.ReactNode;
};


// -------------------
export function BigError(props: BigErrorProps) {
  return (
    <Alert
      borderRadius="8px"
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Ooops, sorry! An error occurred:
          </AlertTitle>
    </Alert>
  );
}

// -------------------
BigError.Message = ({ children }: BigErrorMessageProps) => (
  <AlertDescription maxWidth="sm">
    {children}
  </AlertDescription>
);


export default BigError;
