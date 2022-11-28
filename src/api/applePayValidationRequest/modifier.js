import { get as _get } from 'lodash-es';

export default function applePayValidationRequestModifier(response) {
  return _get(response, 'data.mollieApplePayValidation.response', {});
}
