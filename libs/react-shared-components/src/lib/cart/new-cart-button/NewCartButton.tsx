// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Button } from '@chakra-ui/react';
import { useBlankCartMutation } from '@multi-cart/react-data-access';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';
import { useIsAuth } from '../../_hooks/useIsAuth';
import useMyToasts from '../../_hooks/useMyToasts';
import './NewCartButton.module.scss';

export interface NewCartButtonProps {
  className?: string;
}

export function NewCartButton({ className }: NewCartButtonProps) {
  useIsAuth();

  const [, blankCart] = useBlankCartMutation();
  const router = useRouter();
  const { toastError, toastSuccess } = useMyToasts();


  return (
    <Button
      leftIcon={<PlusIcon />}
      colorScheme="pink"
      variant="solid"
      onClick={async () => {
        const { error, data } = await blankCart();
        if (!error && data?.blankCart?.id) {
          toastSuccess("Successfully created new cart!")
          router.push(`/cart/${data.blankCart.id}`);
        } else if(error) {
          toastError(error.message);
        }
        
      }}
      size="xs"
      className={clsx(className)}
      data-testid="btnNewCart">New Cart
    </Button>
  );
}

export default NewCartButton;
