export const MOLLIE_APPLE_PAY_VALIDATION = `
  mutation mollieApplePayValidation(
    $domain: String!
    $validationURL: String!
  ) {
      mollieApplePayValidation(
          domain: $domain
          validationUrl: $validationURL
      ) {
          response
      }
  }
`;
