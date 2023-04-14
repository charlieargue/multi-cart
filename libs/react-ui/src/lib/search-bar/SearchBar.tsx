import { Box, HStack, Input } from '@chakra-ui/react';
import React from 'react';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';
import { TiDelete as DeleteIcon } from 'react-icons/ti';
export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm(string): void;
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <>
      <HStack>
        <SearchIcon />
        <Box>Search by account number or name</Box>
        <DeleteIcon
          data-testid="btnDeleteCartLineAccount"
          size="16"
          cursor={'pointer'}
          color="red"
          onClick={() => setSearchTerm('')}
        />
      </HStack>
      <Input
        mt={2}
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </>
  );
};

export default SearchBar;
