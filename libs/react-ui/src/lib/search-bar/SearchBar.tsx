import { Box, HStack, Input } from '@chakra-ui/react';
import React from 'react';
import { BiSearchAlt as SearchIcon } from 'react-icons/bi';

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <>
      <HStack>
        <SearchIcon />
        <Box>Search by account number or name</Box>
      </HStack>
      <Input
        mt={2}
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </>
  );
};

export default SearchBar;
