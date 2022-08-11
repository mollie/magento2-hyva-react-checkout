import { useContext } from 'react';
import { get as _get } from 'lodash-es';

import CartContext from '../../../../context/Cart/CartContext';

export default function useMollieCartContext() {
  const [cartData, { setCartInfo }] = useContext(CartContext);
  const cartId = _get(cartData, 'cart.id');

  return {
    cartId,
    setCartInfo,
  };
}
