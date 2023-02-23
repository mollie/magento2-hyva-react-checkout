import React, { useEffect, useCallback } from 'react';
import { shape, func } from 'prop-types';
import { paymentMethodShape } from '../../../../utils/payment';
import RadioInput from '../../../../components/common/Form/RadioInput';
import useCheckoutFormContext from '../../../../hook/useCheckoutFormContext';
import useApplePayToPlaceOrder from '../hooks/useApplePayToPlaceOrder';
import usePaymentMethodFormContext from '../../../../components/paymentMethod/hooks/usePaymentMethodFormContext';

function ApplePayRenderer({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const { registerPaymentAction } = useCheckoutFormContext();
  const { applePayPlaceOrder } = useApplePayToPlaceOrder();
  const { submitHandler } = usePaymentMethodFormContext();
  const submitHandlerCallback = useCallback(submitHandler, [submitHandler]);

  useEffect(() => {
    if (!isSelected) {
      return;
    }

    registerPaymentAction(method.code, applePayPlaceOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected, method.code]);

  useEffect(() => {
    if (!isSelected) {
      return;
    }

    // Mark this method as selected
    submitHandlerCallback(method.code);
  }, [method.code, isSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  try {
    if (!window.ApplePaySession || !window.ApplePaySession.canMakePayments()) {
      return null;
    }
  } catch (error) {
    return null;
  }

  if (!isSelected) {
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
      <div>
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          checked={isSelected}
          onChange={actions.change}
        />
      </div>
    </div>
  );
}

ApplePayRenderer.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default ApplePayRenderer;
