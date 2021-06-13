import { Badge, Box, Image, LinkBox } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';
import { Product } from './ProductTypes';

interface ProductCardProps {
  product: Product
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  ...props
}) => (
  <LinkBox cursor="pointer">
    <NextLink href="/">
      <a href="/" style={{ outline: "none" }}>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image
            fallbackSrc="/blue-loading-spinner-transparent-bg.gif"
            src={`https://source.unsplash.com/500x500/?product&amp;${product.sku}`}
            alt="mocked" />
          <Box p="6">

            {/* OH, thats how you do it */}
            <Box d="flex" alignItems="baseline" ml="-.5">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                UOM
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2">
                category perhaps
              </Box>
            </Box>

            {/* NAME */}
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {product.name}
            </Box>

            {/* PRICE */}
            <Box>
              ${product.price}
              <Box as="span" color="gray.600" fontSize="sm" ml="1">USD</Box>
            </Box>

          </Box>
        </Box>
      </a>
    </NextLink>
  </LinkBox>
)

export default ProductCard
