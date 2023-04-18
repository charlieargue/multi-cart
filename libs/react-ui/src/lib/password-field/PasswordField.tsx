// thx: (see code) https://pro.chakra-ui.com/components/application-ui/authentication
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputGroup,
  InputProps,
  InputRightElement,
  useColorModeValue as mode,
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import InputField from '../input-field/InputField';
import './PasswordField.module.scss';

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
        <NextLink href="/forgot-password" legacyBehavior>
          <Box href="/forgot-password" as="a" color={mode('pink.600', 'pink.200')} fontWeight="semibold" fontSize="sm">
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
