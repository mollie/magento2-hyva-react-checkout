import { get as _get } from 'lodash-es';

export default function restoreCartRequestModifier(result) {
  return _get(result, 'data.restoreCart.order', {});
}
