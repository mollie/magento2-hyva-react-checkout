import RootElement from '../../../../utils/rootElement';
import env from '../../../../utils/env';
import { config } from '../../../../config';

const paymentConfig = RootElement.getPaymentConfig();

const mollieConfig = paymentConfig.mollie || {};
const useComponents = mollieConfig?.creditcard?.use_components;
const applePayType = mollieConfig?.applepay?.integration_type;
const storeName = mollieConfig?.store?.name || 'Your Store Name';

const { code: rootCurrencyCode } = RootElement.getCurrency();
const envCurrencyCode = env.currencyCode;

const currencyCode = envCurrencyCode || rootCurrencyCode;

const defaultCountry =
  env.defaultCountry ||
  RootElement.getDefaultCountryId() ||
  config.defaultCountry;

const {
  profile_id, // eslint-disable-line camelcase
  locale,
  testmode,
} = mollieConfig;

export {
  profile_id as profileId, // eslint-disable-line camelcase
  useComponents,
  locale,
  testmode,
  applePayType,
  currencyCode,
  defaultCountry,
  storeName,
};
