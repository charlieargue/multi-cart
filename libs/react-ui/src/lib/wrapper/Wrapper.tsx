import { Flex, useColorMode } from '@chakra-ui/react';
import React from 'react';


export const Wrapper = (props) => {
    const { colorMode } = useColorMode(); // TODO: abstract this out into a generic Container (but what about Box like MicroLayout?) -- see with=
    const bgColor = { light: 'gray.50', dark: 'gray.900' }; // TODO: make these into re-usable (hook)?
    const color = { light: 'black', dark: 'white' };

    // NOTE: you don't even need children with ...props like that, wut?
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            bg={bgColor[colorMode]}
            color={color[colorMode]}
            {...props}
        />
    );
}