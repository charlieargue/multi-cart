import { Badge, Button, Td, Text, Tr } from '@chakra-ui/react';
import { CartLine, useDeleteCartLineMutation, useUpdateCartLineMutation } from '@multi-cart/react-data-access';
import { AutoSave, CategoriesDropDown } from '@multi-cart/react-shared-components';
import { InputField } from '@multi-cart/react-ui';
import { toFriendlyCurrency } from '@multi-cart/util';
import { Form, Formik } from "formik";
import React, { useRef } from 'react';
import './CartLineRow.module.scss';
import { CgClose as CloseIcon } from 'react-icons/cg';

interface CartLineRowProps {
  line: CartLine;
  idx: number;
  children?: React.ReactNode;
}

// - thx:https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// - thx: https://github.com/benawad/lireddit/tree/master/web/src/pages/post/edit
// - thx: https://gist.github.com/jaredpalmer/56e10cabe839747b84b81410839829be
export const CartLineRow = ({ line, children, idx }: CartLineRowProps) => {
  const [, deleteCartLine] = useDeleteCartLineMutation();
  const [, updateCartLine] = useUpdateCartLineMutation();
  const initializing = useRef(true);

  if (!line) {
    return <div>Loading line..</div>;
  }

  return (
    // TODO: clean up the css/shared w/ editCart issue...

    <>
      <Formik
        initialValues={{
          itemId: line.itemId,
          description: line.description,
          quantity: line.quantity,
          price: line.price,
        }}
        onSubmit={async (values) => {

          // don't over fire when Formik hydrates form
          if (!initializing.current) {
            // some validation
            if (typeof values.price == "number" &&
              typeof values.quantity == "number"
            ) {
              await updateCartLine({
                cartLine: {
                  id: line.id,
                  cartId: line.cartId,
                  categoryId: line.categoryId as any,
                  uom: line.uom as any,
                  itemId: values.itemId as any,
                  description: values.description as any,
                  quantity: parseInt(values.quantity as any),
                  price: parseFloat(values.price as any),
                }
              });
            }
          }
          initializing.current = false;
        }}
      >
        {({ isSubmitting }) => (
          <Tr >
            <Td className="pl-3">
              <Badge colorScheme="gray">
                {idx + 1}
              </Badge>
            </Td>
            <Td>
              <Form>
                <InputField
                  bg="white"
                  name="itemId"
                  id={`itemId_${line.id}`}
                  type="text"
                  aria-describedby="itemNum"
                  placeholder="Item #" />
              </Form>

            </Td>

            <Td>
              <Form>
                <InputField
                  bg="white"
                  name="description"
                  id={`description_${line.id}`}
                  type="text"
                  placeholder="Description" />
              </Form>

            </Td>
            <Td className="pt-2">
              <CategoriesDropDown />
            </Td>

            <Td>
              {/* <DropdownButton variant="light" id="dropdown-item-button" title="UOM">
                {
                  ['Each', 'Case', 'Box', 'Service'].map((uom) => (
                    <Dropdown.Item key={uom} as="button">{uom}</Dropdown.Item>
                  ))
                }

              </DropdownButton> */}
            </Td>
            <Td>
              <InputField
                bg="white"
                id={`quantity_${line.id}`}
                name="quantity"
                type="number"
                aria-describedby="itemQuantity"
                placeholder="Qty" />
            </Td>
            <Td>
              <InputField
                bg="white"
                id={`price_${line.id}`}
                name="price"
                type="number"
                aria-describedby="itemPrice"
                placeholder="Price" />
            </Td>
            <Td>
              <Text fontWeight="bold">{typeof line.price === "number" && typeof line.quantity === "number" ? toFriendlyCurrency(line.price * line.quantity) : 0}</Text>
            </Td>

            <Td>
              <Button
                rounded="lg"
                bg="red"
                p="1"
                onClick={() => deleteCartLine({ cartId: line.cartId, cartLineId: line.id })}>
                <CloseIcon color="white" size={19} />
              </Button>
              {/* TODO: make float or not change width of rest of row, and NOT fire on component load */}
              <AutoSave debounceMs={300} />
            </Td>
          </Tr>
        )}
      </Formik>
      <Tr>
        <Td colSpan={20}>
          {children}
        </Td>
      </Tr>
    </>
  );
}