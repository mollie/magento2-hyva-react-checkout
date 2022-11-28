import sendRequest from '../../../../../api/sendRequest';
import modifier from './modifier';
import { MOLLIE_APPLE_PAY_VALIDATION } from './mutation';

export default async function applePayValidationRequest(
  appDispatch,
  validationURL
) {
  return modifier(
    await sendRequest(appDispatch, {
      query: MOLLIE_APPLE_PAY_VALIDATION,
      variables: {
        domain: window.location.hostname,
        validationURL,
      },
    })
  );
}
