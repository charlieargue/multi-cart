import { Button } from '@chakra-ui/react';
import { useBlankCartMutation } from '@multi-cart/react-data-access';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';
import { useIsAuth } from '../../auth/useIsAuth';
import './NewCartButton.module.scss';

/* eslint-disable-next-line */
export interface NewCartButtonProps {
  className?: string;
}

export function NewCartButton({ className }: NewCartButtonProps) {
  useIsAuth(); // 🛡 session authentication

  const [, blankCart] = useBlankCartMutation();
  const router = useRouter();


  return (
    <Button
      leftIcon={<PlusIcon />}
      colorScheme="pink"
      variant="solid"
      onClick={async () => {
        const { error, data } = await blankCart();
        if (!error && data?.blankCart?.id) {
          router.push(`/cart/${data.blankCart.id}`);
        }
        // TODO: error handling
      }}
      size="xs"
      className={clsx(className)}
      data-testid="btnNewCart">New Cart
    </Button>
  );
}

export default NewCartButton;
