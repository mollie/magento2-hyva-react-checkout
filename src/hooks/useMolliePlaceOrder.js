import { __ } from '../../../../i18n';
import setPaymentMethodOnCartRequest from '../api/setPaymentMethodOnCartRequest';
import useMollieAppContext from './useMollieAppContext';
import useMollieCartContext from './useMollieCartContext';
import placeOrderRequest from '../api/placeOrderRequest';
import restoreCartRequest from '../api/restoreCartRequest';

export default function useMolliePlaceOrder({ methodCode, selectedIssuer }) {
  const { cartId, setCartInfo } = useMollieCartContext();
  const { setPageLoader, setErrorMessage, appDispatch } = useMollieAppContext();

  const placeOrder = async ({ token = null }) => {
    try {
      setPageLoader(true);
      await setPaymentMethodOnCartRequest(appDispatch, {
        cartId,
        paymentCode: methodCode,
        issuer: selectedIssuer,
        cardToken: token,
      });
    } catch (error) {
      setPageLoader(false);
      setErrorMessage(
        __('Something went wrong while adding the payment method to the quote.')
      );
    }

    try {
      const { mollie_redirect_url: mollieRedirectUrl } =
        await placeOrderRequest(appDispatch);

      if (!mollieRedirectUrl) {
        throw Error('No redirect url found');
      }

      setPageLoader(false);
      window.location.assign(mollieRedirectUrl);
    } catch (error) {
      const cart = await restoreCartRequest(cartId);
      setCartInfo(cart);

      setPageLoader(false);
      setErrorMessage(__('Something went wrong while placing the order.'));
    }
  };

  const placeOrderWithToken = async (mollie) => {
    setPageLoader(true);

    const { token, error } = await mollie.createToken();

    if (error) {
      setPageLoader(false);
      setErrorMessage(error.message);
      return;
    }

    await placeOrder({ token });
  };

  return {
    placeOrder,
    placeOrderWithToken,
  };
}
