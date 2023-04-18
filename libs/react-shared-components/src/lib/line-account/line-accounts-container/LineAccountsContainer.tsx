import {
  Box,
  Stack,
  Td,
  Text,
  Tr,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import { Sort } from '@multi-cart/react-ui';
import { areLineAccountsValid } from '@multi-cart/util';
import React, { useRef } from 'react';
import { FaRegCreditCard as LineAccountsIcon } from 'react-icons/fa';
import DrawerContainer from '../drawer-container/DrawerContainer';
import LineAccount from '../../line-account/line-account/LineAccount';
import AddLineAccountButton from '../add-line-account-button/AddLineAccountButton';
import LineAccountValidators from '../line-account-validators/LineAccountValidators';

export interface LineAccountsContainerProps {
  line?: CartLine;
  saveLineAccount(newPercentage: number, lineAccountId: string, line: CartLine): void;
  setPercentageMap: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export const LineAccountsContainer = ({
  line,
  saveLineAccount,
  setPercentageMap
}: LineAccountsContainerProps) => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr>
      <Td colSpan={20}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={3}
          rounded={{
            md: 'lg',
          }}
          shadow="base"
          mt={2}
          mb={20}
        >
          <Wrap spacing="5" align="center">
            <WrapItem>
              <Stack
                direction="row"
                spacing={4}
                align="center"
                mt={1}
                bg={areLineAccountsValid(line) ? 'green.50' : 'red.100'}
                px={4}
                py={3}
                rounded="md"
                shadow="unset"
                data-testid="stackOneLineAccountsContainer"
              >
                <LineAccountsIcon />
                <Text fontWeight="bold" fontSize="md">
                  Line Accounts
                </Text>
                <AddLineAccountButton btnRef={btnRef} clickHandler={onOpen} />
                <LineAccountValidators line={line} />
              </Stack>
              <DrawerContainer
                line={line}
                btnRef={btnRef}
                isOpen={isOpen}
                onClose={onClose}
              />
            </WrapItem>
            <Sort by="createdAt" childType="cla">
              {line?.cartLineAccounts?.map((cla) => (
                <WrapItem key={cla.id}>
                  <LineAccount
                    lineAccount={cla}
                    line={line}
                    saveLineAccount={saveLineAccount}
                    setPercentageMap={setPercentageMap}
                  />
                </WrapItem>
              ))}
            </Sort>
          </Wrap>
        </Box>
      </Td>
    </Tr>
  );
};

export default LineAccountsContainer;
