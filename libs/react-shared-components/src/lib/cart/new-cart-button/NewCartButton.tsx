import React from 'react';
import clsx from 'clsx';
import { useBlankCartMutation } from '@multi-cart/react-data-access';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { useIsAuth } from '@multi-cart/react-shared-components';

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

export default NewCartButton;
