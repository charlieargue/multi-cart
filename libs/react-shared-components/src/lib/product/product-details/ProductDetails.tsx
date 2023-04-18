// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

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
import React, { useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { Product } from '../product-card/ProductTypes';
import { FaShoppingCart as ShoppingCartIcon } from 'react-icons/fa';
import { Cart, CartLine, CartLineInput, useAddCartLineMutation, useCartsQuery, useMeQuery, useUpdateCartLineMutation } from '@multi-cart/react-data-access';
import useMyToasts from '../../_hooks/useMyToasts';
import { useRouter } from 'next/router';

export interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [{ data, fetching }] = useMeQuery();
  const [{ data: dataCarts, fetching: fetchingCarts }] = useCartsQuery();
  const [, addCartLine] = useAddCartLineMutation();
  const [, updateCartLine] = useUpdateCartLineMutation();
  const { toastError, toastSuccess } = useMyToasts();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // -------------------
  const handleAddToCart = async () => {
    // add this product to the user's current cart + deduping w/ existing cart LINES

    // ##################################################################################
    // 1) confirm that this user has a current cart
    // ##################################################################################
    // TODO: DRY THIS! use also in CartAvatar
    setIsProcessing(true);
    try {
      const getCurrentCart = (): Cart => {
        if (data?.me?.currentCartId && !fetchingCarts && dataCarts?.carts) {
          return dataCarts?.carts.find((c) => c.id === data?.me?.currentCartId) as Cart;
        }
        return null;
      };
      const currentCart = getCurrentCart();

      if (!!data.me.currentCartId === false || !currentCart) {
        toastError("You do not have an active 🛒  shopping cart!")
      } else {

        const existingCartLine: CartLine = currentCart.cartLines.find((cl) => cl.itemId === product.sku);

        // ##################################################################################
        // 2) if EXISTS already, just update quantity + 1 (updateCartLine)
        // ##################################################################################
        // 🔴 and will this trigger a LINE ACCOUNT percent/amount RECALC ??? (or moot since routing to EditCart page?)
        let error, dataCartLine;
        if (existingCartLine) {
          // NOTE: not using ...existingCartLine syntax because extra fields causing trouble, and who knows about FUTURE extra fields
          const { error: errorUpdate, data: dataUpdate } = await updateCartLine({
            cartLine: {
              id: existingCartLine.id,
              cartId: existingCartLine.cartId,
              itemId: existingCartLine.itemId,
              description: existingCartLine.description,
              uom: existingCartLine.uom,
              categoryId: existingCartLine.categoryId,
              quantity: existingCartLine.quantity + 1,
              price: existingCartLine.price,
            } as CartLineInput
          });
          error = errorUpdate;
          dataCartLine = dataUpdate;

        } else {

          // ##################################################################################
          // 3) if this product (by SKU) does NOT exist in current cart already, add it normally (addCartLine)
          // ##################################################################################
          const { error: errorAdd, data: dataAdd } = await addCartLine({
            cartLine: {
              cartId: data.me.currentCartId,
              itemId: product.sku,
              description: product.name,
              price: product.price,
              uom: "EACH",
              categoryId: "1",
              quantity: 1
            }
          });
          error = errorAdd;
          dataCartLine = dataAdd;
        }

        // ##################################################################################
        // 4) handle errors for either endpoint
        // ##################################################################################
        if (!error && (dataCartLine?.addCartLine?.id) || (dataCartLine?.updateCartLine?.id)) {
          (dataCartLine?.addCartLine?.id) ? toastSuccess("Product added successfully!") : toastSuccess("Product quantity incremented!");
          router.push(`/cart/${data.me.currentCartId}`);
        } else if (error) {
          toastError(error.message);
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };


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
          className="cursor-pointer"
          isLoading={isProcessing}
          loadingText="Processing..."
          mt="8"
          as="a"
          size="lg"
          colorScheme="pink"
          fontWeight="bold"
          onClick={handleAddToCart}>
          <ShoppingCartIcon />&nbsp;&nbsp;Add to Cart
          </Button>
      </Box>


    </HStack >
  );
}

export default ProductDetails;
