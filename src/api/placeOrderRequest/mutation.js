export const PLACE_ORDER_MUTATION = `
    mutation placeOrder(
        $cartId: String!
    ) {
        placeOrder(
          input: {
            cart_id: $cartId,
          }
        ) {
          order {
            mollie_redirect_url
            mollie_payment_token
          }
        }
    }
`;
