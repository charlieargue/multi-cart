import {
  Box,
  Button,
  Flex, Heading,
  HStack, Image,
  List,
  ListIcon,
  ListItem, Stack, Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { Product } from '../product-card/ProductTypes';
import { FaShoppingCart as ShoppingCartIcon } from 'react-icons/fa';
import { useAddCartLineMutation, useMeQuery } from '@multi-cart/react-data-access';
import useMyToasts from '../../_hooks/useMyToasts';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [{ data, fetching }] = useMeQuery();
  const [, addCartLine] = useAddCartLineMutation();
  const { toastError, toastSuccess } = useMyToasts();
  const router = useRouter();

  return (
    <HStack spacing={8} alignItems="stretch">

      {/* // ------------------- */}
      {/* PRODUCT  */}
      {/* // ------------------- */}
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          bgGradient="linear(to-r, white, pink.100)"
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            fallbackSrc="/blue-loading-spinner-transparent-bg.gif"
            src={`https://source.unsplash.com/500x500/?product&amp;${product?.sku}`}
            alt="mocked" />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {product?.slug}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {product?.name}
          </Heading>
          <Text color={'gray.500'}>
            {product?.description}
          </Text>
        </Stack>

      </Box>

      {/* // ------------------- */}
      {/* PRICE  */}
      {/* // ------------------- */}
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={12}
        overflow={'hidden'}>
        <Flex align="flex-end" justify="left" fontWeight="extrabold" color="primary" mt="8">
          <Heading size="xl" fontWeight="inherit" lineHeight="0.9em" ml="-10px">
            ${product?.price}
          </Heading>
          <Text fontWeight="medium" fontSize="xl" ml="2">
            USD
          </Text>
        </Flex>
        <Text mt="4" fontSize="lg" mb="8">
          {product?.description}
        </Text>
        <List spacing="4" mb="8" maxW="28ch">
          <ListItem fontWeight="medium">
            <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color="brand.pink" />
            brushed fleece inside
          </ListItem>
          <ListItem fontWeight="medium">
            <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color="brand.pink" />
            a relaxed unisex fit
          </ListItem>
          <ListItem fontWeight="medium">
            <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color="brand.pink" />
            Rough pattern in obsidian black
          </ListItem>
          <ListItem fontWeight="medium">
            <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color="brand.pink" />
            Welt pockets
          </ListItem>
          <ListItem fontWeight="medium">
            <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color="brand.pink" />
            Bungee-style drawstring at hood
          </ListItem>
        </List>

        {/* 🛍 MOCKED: add to cart BUTTON */}
        <Button
          mt="8"
          as="a"
          href="#"
          size="lg"
          colorScheme="pink"
          fontWeight="bold"
          onClick={async () => {

            // 1) confirm that this user has a current cart
            if (!!data.me.currentCartId === false) {
              toastError("🛍 You do not have an active shopping cart!")
            }
            // 2) add this product to the user's current cart
            const { error, data: newlyAddedProduct } = await addCartLine({
              "cartLine": {
                "cartId": data.me.currentCartId,
                "itemId": product.sku,
                "description": product.description,
                "price": product.price,
                "uom": "EACH",
                "categoryId": "1",
                "quantity": 1
              }
            });

            if (!error && newlyAddedProduct?.addCartLine?.id) {
              toastSuccess("Successfully added product to your current cart!")
              router.push(`/cart/${data.me.currentCartId}`);
            } else if (error) {
              toastError(error.message);
            }
            // TODO: deduping w/ existing cart LINES!

          }}>
          <ShoppingCartIcon />&nbsp;&nbsp;Add to Cart
          </Button>
      </Box>


    </HStack>
  );
}

export default ProductDetails;
