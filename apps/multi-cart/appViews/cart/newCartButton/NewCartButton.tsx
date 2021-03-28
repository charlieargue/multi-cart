import clsx from 'clsx';
import { useBlankCartMutation } from '@multi-cart/react-data-access';
import { useRouter } from 'next/router';
import React from 'react'
import { Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import useIsAuth from '../../../utils/useIsAuth';

interface NewCartButtonProps {
    className?: string;
}

export const NewCartButton: React.FC<NewCartButtonProps> = ({ className }) => {
    useIsAuth(); // 🛡 session authentication

    const [, blankCart] = useBlankCartMutation();
    const router = useRouter();

    return (
        <Button
            onClick={async () => {
                const { error, data } = await blankCart();
                if (!error && data?.blankCart?.id) {
                    router.push(`/cart/${data.blankCart.id}`);
                }
                // TODO: error handling
            }}
            size="sm"
            variant="success"
            className={clsx(className)}
            data-testid="btnNewCart"><PlusCircleFill className="align-text-bottom mr-1" />New Cart
        </Button>
    );
}