import sendRequest from '../../../../../api/sendRequest';
import LocalStorage from '../../../../../utils/localStorage';

import { PLACE_ORDER_MUTATION } from './mutation';
import modifier from './modifier';

export default async function placeOrderRequest(appDispatch) {
  const variables = {
    cartId: LocalStorage.getCartId(),
  };

  return modifier(
    await sendRequest(appDispatch, {
      query: PLACE_ORDER_MUTATION,
      variables,
    })
  );
}
