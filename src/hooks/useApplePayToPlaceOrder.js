import { useCallback, useContext } from 'react';
import { get as _get } from 'lodash-es';
import CartContext from '../../../../context/Cart/CartContext';
import useMollieAppContext from './useMollieAppContext';
import applePayValidationRequest from '../api/applePayValidationRequest';
import useMolliePlaceOrder from './useMolliePlaceOrder';
import { currencyCode, defaultCountry, storeName } from '../utility/config';

export default function useApplePayToPlaceOrder() {
  const { appDispatch } = useMollieAppContext();
  const [cartData] = useContext(CartContext);
  const cart = _get(cartData, 'cart');
  const prices = _get(cart, 'prices') || {};
  const { placeOrder } = useMolliePlaceOrder({
    methodCode: 'mollie_methods_applepay',
  });

  return {
    applePayPlaceOrder: useCallback(() => {
      let session;

      const request = {
        countryCode: defaultCountry,
        currencyCode,

        supportedNetworks: ['amex', 'maestro', 'masterCard', 'visa', 'vPay'],
        merchantCapabilities: ['supports3DS'],
        total: {
          // TODO: Make this configurable
          label: storeName,
          amount: prices.grandTotalAmount,
        },
      };

      if (!session) {
        // eslint-disable-next-line no-undef
        session = new ApplePaySession(3, request);
      }

      session.onpaymentmethodselected = () => {
        session.completePaymentMethodSelection(
          {
            label: 'Total',
            type: 'final',
            amount: prices.grandTotalAmount,
          },
          []
        );
      };

      session.onvalidatemerchant = async (event) => {
        const response = await applePayValidationRequest(
          appDispatch,
          event.validationURL
        );

        session.completeMerchantValidation(JSON.parse(response));
      };

      session.onpaymentauthorized = (event) => {
        try {
          placeOrder({ applePayToken: JSON.stringify(event.payment.token) });
        } catch {
          // eslint-disable-next-line no-undef
          session.completePayment(ApplePaySession.STATUS_ERROR);
        }
      };

      session.oncancel = () => {
        session = null;
      };

      session.begin();
    }, [prices.grandTotalAmount, appDispatch, placeOrder]),
  };
}
