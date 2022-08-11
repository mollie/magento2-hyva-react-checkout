import sendRequest from '../../../../../api/sendRequest';
import LocalStorage from '../../../../../utils/localStorage';

import { SET_PAYMENT_METHOD_ON_CART } from './mutation';
import modifier from './modifier';

export default async function setPaymentMethodOnCartRequest(
  appDispatch,
  setPaymentInput
) {
  const variables = {
    ...setPaymentInput,
    cartId: LocalStorage.getCartId(),
  };

  return modifier(
    await sendRequest(appDispatch, {
      query: SET_PAYMENT_METHOD_ON_CART,
      variables,
    })
  );
}
