import React, { useEffect, useCallback } from 'react';
import { shape, func } from 'prop-types';
import { __ } from '../../../../i18n';
import { paymentMethodShape } from '../../../../utils/payment';
import useCheckoutFormContext from '../../../../hook/useCheckoutFormContext';
import usePaymentMethodFormContext from '../../../../components/paymentMethod/hooks/usePaymentMethodFormContext';
import RadioInput from '../../../../components/common/Form/RadioInput';
import { useComponents, profileId } from '../utility/config';
import useMolliePlaceOrder from '../hooks/useMolliePlaceOrder';
import MollieComponent from './MollieComponent';

function CreditCardComponentsRenderer({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const { submitHandler } = usePaymentMethodFormContext();
  const submitHandlerCallback = useCallback(submitHandler, [submitHandler]);
  const { mollie, placeOrderWithToken } = useMolliePlaceOrder({
    methodCode: method.code,
    selectedIssuer: null,
  });

  useEffect(() => {
    if (!isSelected || !mollie) {
      return;
    }

    registerPaymentAction(method.code, placeOrderWithToken);
  }, [
    registerPaymentAction,
    placeOrderWithToken,
    isSelected,
    method.code,
    mollie,
  ]);

  useEffect(() => {
    if (!isSelected) {
      return;
    }

    // Mark this method as selected
    submitHandlerCallback(method.code);
  }, [method.code, isSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isSelected || !useComponents || !profileId || !mollie) {
    return (
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
    );
  }

  return (
    <div>
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />

      <MollieComponent mollie={mollie} type="cardHolder" label={__('Name')} />

      <MollieComponent
        mollie={mollie}
        type="cardNumber"
        label={__('Credit card number')}
      />

      <MollieComponent
        mollie={mollie}
        type="expiryDate"
        label={__('Expiry date')}
      />

      <MollieComponent
        mollie={mollie}
        type="verificationCode"
        label={__('CVC')}
      />
    </div>
  );
}

CreditCardComponentsRenderer.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default CreditCardComponentsRenderer;
