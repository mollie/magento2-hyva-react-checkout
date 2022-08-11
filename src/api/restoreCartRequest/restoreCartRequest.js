import sendRequest from '../../../../../api/sendRequest';
import LocalStorage from '../../../../../utils/localStorage';

import { RESTORE_CART } from './mutation';
import modifier from './modifier';

export default async function restoreCartRequest(appDispatch) {
  const variables = {
    cartId: LocalStorage.getCartId(),
  };

  return modifier(
    await sendRequest(appDispatch, {
      query: RESTORE_CART,
      variables,
    })
  );
}
