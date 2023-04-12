import { Badge, Button, Td, Text, Tr } from '@chakra-ui/react';
import {
  CartLine,
  useDeleteCartLineMutation,
  useUpdateCartLineMutation,
} from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { toFriendlyCurrency } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import React, { useRef } from 'react';
import { CgClose as CloseIcon } from 'react-icons/cg';
import { AutoSave } from '../../auto-save/AutoSave';
import { CategoriesDropDown } from '../categories-drop-down/CategoriesDropDown';
import UOMDropDown from '../uomdrop-down/UOMDropDown';

export interface CartLineFormProps {
  idx: number;
  line: CartLine;
}

export const CartLineForm = ({ idx, line }: CartLineFormProps) => {
  const [{ fetching: deleting }, deleteCartLine] = useDeleteCartLineMutation();
  const [, updateCartLine] = useUpdateCartLineMutation();
  const skipAutoSaveWhenFormikInits = useRef(true);

  const submit = async (values) => {
    if (!skipAutoSaveWhenFormikInits.current) {
      if (
        typeof values.price == 'number' &&
        typeof values.quantity == 'number'
      ) {
        await updateCartLine({
          cartLine: {
            id: line.id,
            cartId: line.cartId,
            categoryId: line.categoryId,
            uom: line.uom,
            itemId: values.itemId,
            description: values.description,
            quantity: Number(values.quantity),
            price: Number(values.price),
          },
        });
      }
    }
    skipAutoSaveWhenFormikInits.current = false;
  };

  const deleteLine = () => {
    if (!deleting) {
      deleteCartLine({
        cartId: line.cartId,
        cartLineId: line.id,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        itemId: line.itemId,
        description: line.description,
        quantity: line.quantity,
        price: line.price,
      }}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Tr>
          <Td className="pl-3">
            <Badge colorScheme="gray">{idx + 1}</Badge>
          </Td>
          <Td>
            <Form>
              <InputField
                bg="white"
                name="itemId"
                id={`itemId_${line.id}`}
                type="text"
                aria-describedby="itemNum"
                placeholder="Item #"
              />
            </Form>
          </Td>
          <Td>
            <Form>
              <InputField
                bg="white"
                name="description"
                id={`description_${line.id}`}
                type="text"
                placeholder="Description"
              />
            </Form>
          </Td>
          <Td className="pt-2" minW="255px">
            <CategoriesDropDown />
          </Td>
          <Td>
            <UOMDropDown />
          </Td>
          <Td>
            <InputField
              data-testid="inputQuantity"
              bg="white"
              id={`quantity_${line.id}`}
              name="quantity"
              type="number"
              aria-describedby="itemQuantity"
              placeholder="Qty"
            />
          </Td>
          <Td>
            <InputField
              bg="white"
              id={`price_${line.id}`}
              name="price"
              type="number"
              aria-describedby="itemPrice"
              placeholder="Price"
            />
          </Td>
          <Td>
            <Text fontWeight="bold">
              {typeof line.price === 'number' &&
              typeof line.quantity === 'number'
                ? toFriendlyCurrency(line.price * line.quantity)
                : 0}
            </Text>
          </Td>

          <Td>
            <Button
              data-testid="btnDeleteCartLine"
              rounded="lg"
              colorScheme="pink"
              p="1"
              onClick={deleteLine}
            >
              <CloseIcon color="white" size={19} />
            </Button>
            <AutoSave debounceMs={300} />
          </Td>
        </Tr>
      )}
    </Formik>
  );
};
export default CartLineForm;
