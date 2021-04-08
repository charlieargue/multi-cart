import { Link as ChakraLink, List, ListIcon, ListItem } from '@chakra-ui/react';
import { createUrqlClient } from '@multi-cart/react-data-access';
import { AppLayout } from '@multi-cart/react-shared-components';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { HiEye } from 'react-icons/hi';

const Index = () => {

  return (
    <AppLayout>
      Dashboard

      {/* testing */}
      <List spacing={3} my={0}>
        <ListItem>
          <ListIcon as={HiEye} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <HiEye />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <HiEye />
          </ChakraLink>
        </ListItem>
      </List>
    </AppLayout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);