import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';
import './BigAlert.module.scss';


/* eslint-disable-next-line */
export interface BigAlertProps {
  title: string;
  type: "error" | "warning" | "info" | "success";
  children?: React.ReactNode;
}

export type BigAlertMessageProps = {
  children: React.ReactNode;
};


// -------------------
export function BigAlert({ title, type, children }: BigAlertProps) {
  return (
    <Alert
      borderRadius="8px"
      status={type}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      {children}
    </Alert>
  );
}

// -------------------
BigAlert.Message = ({ children }: BigAlertMessageProps) => (
  <AlertDescription maxWidth="sm">
    {children}
  </AlertDescription>
);


export default BigAlert;
