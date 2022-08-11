import cartBillingAddrInfo from '../../../../../api/cart/utility/query/cartBillingAddrInfo';
import cartItemsInfo from '../../../../../api/cart/utility/query/cartItemsInfo';
import cartPaymentMethodsInfo from '../../../../../api/cart/utility/query/cartPaymentMethodsInfo';
import cartPriceInfo from '../../../../../api/cart/utility/query/cartPriceInfo';
import cartShippingAddrInfo from '../../../../../api/cart/utility/query/cartShippingAddrInfo';

export const RESTORE_CART = `
  mutation mollieRestoreCart(
    $cartId: String!
  ) {
    mollieRestoreCart(input: { cart_id: $cartId }) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
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
