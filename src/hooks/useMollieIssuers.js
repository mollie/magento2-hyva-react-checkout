import { useState } from 'react';
import { __ } from '../../../../i18n';
import setPaymentMethodOnCartRequest from '../api/setPaymentMethodOnCartRequest';
import useMollieAppContext from './useMollieAppContext';
import useMollieCartContext from './useMollieCartContext';

export default function useMollieIssuers() {
  const { cartId, setCartInfo } = useMollieCartContext();
  const { setPageLoader, setErrorMessage, appDispatch } = useMollieAppContext();
  const [selectedIssuer, setSelectedIssuer] = useState(null);

  return {
    getMollieIssuers: async ({ methodCode }) => {
      setPageLoader(true);
      try {
        const cartResponse = await setPaymentMethodOnCartRequest(appDispatch, {
          cartId,
          paymentCode: methodCode,
        });

        return cartResponse.mollie_available_issuers;
      } catch (error) {
        setErrorMessage(__('Error while setting the payment method'));
      } finally {
        setPageLoader(false);
      }

      return [];
    },

    selectedIssuer,
    setSelectedIssuer,
  };
}
