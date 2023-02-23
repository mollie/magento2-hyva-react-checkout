import cartBillingAddrInfo from '../../../../../api/cart/utility/query/cartBillingAddrInfo';
import cartItemsInfo from '../../../../../api/cart/utility/query/cartItemsInfo';
import cartPaymentMethodsInfo from '../../../../../api/cart/utility/query/cartPaymentMethodsInfo';
import cartPriceInfo from '../../../../../api/cart/utility/query/cartPriceInfo';
import cartShippingAddrInfo from '../../../../../api/cart/utility/query/cartShippingAddrInfo';

export const SET_PAYMENT_METHOD_ON_CART = `
    mutation setPaymentMethodOnCart(
        $cartId: String!
        $paymentCode: String!
        $issuer: String,
        $cardToken: String
        $applePayToken: String
    ) {
      setPaymentMethodOnCart(
        input: {
          cart_id: $cartId,
          payment_method: {
            code: $paymentCode
            mollie_selected_issuer: $issuer,
            mollie_card_token: $cardToken,
              mollie_applepay_payment_token: $applePayToken
          }
        }
      ) {
        cart {
          selected_payment_method {
            code
          }
          mollie_available_issuers {
            name
            code
            image
            svg
          }
          ${cartItemsInfo}
          ${cartPriceInfo}
          ${cartBillingAddrInfo}
          ${cartShippingAddrInfo}
          ${cartPaymentMethodsInfo}
        }
      }
    }
`;
