// thx: (see code) https://pro.chakra-ui.com/components/application-ui/authentication
import './PasswordField.module.scss';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useColorModeValue as mode,
  useDisclosure,
  useMergeRefs
} from '@chakra-ui/react'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import NextLink from 'next/link';
import { InputField } from '@multi-cart/react-ui';

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      })
    }
  };

  // TODO: why didn't this work in InputFIeld? // ref={mergeRef}

  return (
    <FormControl id="password">
      <Flex justify="space-between">
        <FormLabel>Password</FormLabel>
        <NextLink href="/forgot-password">
          <Box href="#" as="a" color={mode('pink.600', 'pink.200')} fontWeight="semibold" fontSize="sm">
            Forgot Password?
        </Box>
        </NextLink>
      </Flex>
      <InputGroup>
        <InputRightElement>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>

        <InputField
          placeholder="password"
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          {...props}
        />
      </InputGroup>
    </FormControl>
  )
})

PasswordField.displayName = 'PasswordField';
export default PasswordField;
