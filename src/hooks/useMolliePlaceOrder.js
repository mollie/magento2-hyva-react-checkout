import { useState, useCallback } from 'react';
import { __ } from '../../../../i18n';
import setPaymentMethodOnCartRequest from '../api/setPaymentMethodOnCartRequest';
import useMollieAppContext from './useMollieAppContext';
import useMollieCartContext from './useMollieCartContext';
import placeOrderRequest from '../api/placeOrderRequest';
import restoreCartRequest from '../api/restoreCartRequest';
import useMollieComponentsApi from './useMollieComponentsApi';
import LocalStorage from '../../../../utils/localStorage';
import { config } from '../../../../config';

export default function useMolliePlaceOrder({ methodCode, selectedIssuer }) {
  const { cartId, setCartInfo } = useMollieCartContext();
  const { setPageLoader, setErrorMessage, appDispatch } = useMollieAppContext();
  const [mollie, setMollie] = useState();
  useMollieComponentsApi(methodCode, setMollie);

  const placeOrder = useCallback(
    async ({ token = null, applePayToken = null }) => {
      try {
        setPageLoader(true);
        await setPaymentMethodOnCartRequest(appDispatch, {
          cartId,
          paymentCode: methodCode,
          issuer: selectedIssuer,
          cardToken: token,
          applePayToken,
        });
      } catch (error) {
        setPageLoader(false);
        setErrorMessage(
          __(
            'Something went wrong while adding the payment method to the quote.'
          )
        );
      }

      try {
        const { mollie_redirect_url: mollieRedirectUrl } =
          await placeOrderRequest(appDispatch);

        if (
          !mollieRedirectUrl &&
          (methodCode === 'mollie_methods_applepay' ||
            methodCode === 'mollie_methods_creditcard')
        ) {
          LocalStorage.clearCheckoutStorage();
          window.location.replace(config.successPageRedirectUrl);
        }

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
    },
    [
      setPageLoader,
      setErrorMessage,
      appDispatch,
      cartId,
      methodCode,
      selectedIssuer,
      setCartInfo,
    ]
  );

  const placeOrderWithToken = useCallback(async () => {
    setPageLoader(true);

    const { token, error } = await mollie.createToken();

    if (error) {
      setPageLoader(false);
      setErrorMessage(error.message);
      return;
    }

    await placeOrder({ token });
  }, [setPageLoader, setErrorMessage, mollie, placeOrder]);

  return {
    mollie,
    placeOrder,
    placeOrderWithToken,
  };
}
