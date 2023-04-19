import { useEffect } from 'react';
import { useUpdateUserMutation } from '../generated/graphql';

export function useSaveAsCurrentCart(cartId: string) {
  const [, updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (cartId) {
      updateUser({ currentCartId: cartId });
    }
  }, [cartId, updateUser]);
}
