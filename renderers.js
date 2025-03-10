import { useComponents, applePayType } from './src/utility/config';
import DefaultRenderer from './src/components/DefaultRenderer';
import ApplePayRenderer from './src/components/ApplePayRenderer';
import CreditCardComponentsRenderer from './src/components/CreditCardComponentsRenderer';

let creditcardRenderer = DefaultRenderer;
if (useComponents) {
  creditcardRenderer = CreditCardComponentsRenderer;
}

export default {
  mollie_methods_applepay:
    applePayType === 'direct' ? ApplePayRenderer : DefaultRenderer,
  mollie_methods_alma: DefaultRenderer,
  mollie_methods_bancomatpay: DefaultRenderer,
  mollie_methods_bancontact: DefaultRenderer,
  mollie_methods_banktransfer: DefaultRenderer,
  mollie_methods_belfius: DefaultRenderer,
  mollie_methods_billie: DefaultRenderer,
  mollie_methods_blik: DefaultRenderer,
  mollie_methods_creditcard: creditcardRenderer,
  mollie_methods_directdebit: DefaultRenderer,
  mollie_methods_eps: DefaultRenderer,
  mollie_methods_giftcard: DefaultRenderer,
  mollie_methods_giropay: DefaultRenderer,
  mollie_methods_googlepay: DefaultRenderer,
  mollie_methods_ideal: DefaultRenderer,
  mollie_methods_in3: DefaultRenderer,
  mollie_methods_kbc: DefaultRenderer,
  mollie_methods_klarna: DefaultRenderer,
  mollie_methods_klarnapaylater: DefaultRenderer,
  mollie_methods_klarnapaynow: DefaultRenderer,
  mollie_methods_klarnasliceit: DefaultRenderer,
  mollie_methods_mbway: DefaultRenderer,
  mollie_methods_multibanco: DefaultRenderer,
  mollie_methods_mybank: DefaultRenderer,
  mollie_methods_payconiq: DefaultRenderer,
  mollie_methods_paypal: DefaultRenderer,
  mollie_methods_paysafecard: DefaultRenderer,
  mollie_methods_przelewy24: DefaultRenderer,
  mollie_methods_satispay: DefaultRenderer,
  mollie_methods_sofort: DefaultRenderer,
  mollie_methods_swish: DefaultRenderer,
  mollie_methods_twint: DefaultRenderer,
  mollie_methods_riverty: DefaultRenderer,
  mollie_methods_trustly: DefaultRenderer,
  mollie_methods_voucher: DefaultRenderer,

};
