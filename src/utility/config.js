import RootElement from '../../../../utils/rootElement';

const paymentConfig = RootElement.getPaymentConfig();

const mollieConfig = paymentConfig.mollie;
const useComponents = mollieConfig.creditcard.use_components;

const {
  profile_id, // eslint-disable-line camelcase
  locale,
  testmode,
} = mollieConfig;

export { profile_id as profileId, useComponents, locale, testmode }; // eslint-disable-line camelcase
