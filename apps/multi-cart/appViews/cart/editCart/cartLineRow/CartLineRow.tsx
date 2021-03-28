import clsx from 'clsx';
import { Form, Formik } from "formik";
import { CartLine, useDeleteCartLineMutation, useUpdateCartLineMutation } from '@multi-cart/react-data-access';
import React, { useRef } from 'react';
import { Badge, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { AutoSave } from '@multi-cart/react-shared-components';
import { InputField } from '@multi-cart/react-ui';
import { CategoriesDropDown } from '../categoriesDropDown/categoriesDropDown';
import styles from './CartLineRow.module.scss';

interface CartLineRowProps {
    line: CartLine
}

// - thx:https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
// - thx: https://github.com/benawad/lireddit/tree/master/web/src/pages/post/edit
// - thx: https://gist.github.com/jaredpalmer/56e10cabe839747b84b81410839829be
export const CartLineRow: React.FC<CartLineRowProps> = ({ line }) => {
    const [, deleteCartLine] = useDeleteCartLineMutation();
    const [, updateCartLine] = useUpdateCartLineMutation();
    const initializing = useRef(true);

    if (!line) {
        return <div>Loading line..</div>;
    }

    return (
        // TODO: clean up the css/shared w/ editCart issue...


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
                <tr >
                    <td className="pl-3">
                        <Badge variant="secondary" className="text-gray-light">
                            {line.id}
                        </Badge>
                    </td>
                    <td>
                        <Form className={clsx(styles['cart-line-row__form'], 'align-items-baseline')}>
                            <InputField
                                name="itemId"
                                type="text"
                                className="form-control w-100"
                                aria-describedby="itemNum"
                                placeholder="Item #" />
                        </Form>

                    </td>

                    <td>
                        <Form className={clsx(styles['cart-line-row__form'], 'align-items-baseline')}>
                            <InputField
                                name="description"
                                className={clsx(styles['cart-line-row__description'], 'form-control')}
                                type="text"
                                placeholder="Description" />
                        </Form>

                    </td>
                    <td className="pt-3">
                        <CategoriesDropDown />
                    </td>

                    <td>
                        <DropdownButton variant="light" id="dropdown-item-button" title="UOM">
                            {
                                ['Each', 'Case', 'Box', 'Service'].map((uom) => (
                                    <Dropdown.Item key={uom} as="button">{uom}</Dropdown.Item>
                                ))
                            }

                        </DropdownButton>
                    </td>
                    <td>
                        <InputField
                            name="quantity"
                            type="number"
                            className="form-control w-75"
                            aria-describedby="itemQuantity"
                            placeholder="Qty" />
                    </td>
                    <td>
                        <InputField
                            name="price"
                            type="number"
                            className="form-control w-100"
                            aria-describedby="itemPrice"
                            placeholder="Price" />
                    </td>
                    <td className="pr-3 text-right pt-3">
                        ${typeof line.price === "number" && typeof line.quantity === "number" ? (line.price * line.quantity).toFixed(2) : 0}
                    </td>

                    <td>
                        <Button className="bg-danger text-white p-0 mr-2" onClick={() => deleteCartLine({ cartId: line.cartId, cartLineId: line.id })}>
                            <X size={28} />
                        </Button>
                        {/* TODO: make float or not change width of rest of row, and NOT fire on component load */}
                        <AutoSave debounceMs={300} />
                    </td>
                </tr>
            )}
        </Formik>
    );
}