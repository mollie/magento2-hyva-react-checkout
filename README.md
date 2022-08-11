# Installation

Open the package.json file and add the following line:

```json
"config": {
    "paymentMethodsRepo": {
      "mollie": "git@github.com:mollie/magento2-hyva-react-checkout.git"
    }
},
```

Next, run `npm install`. This should install the repository into your checkout.

## Example checkout

When using the regular React checkout then you are done. But if you are using the [Hyvä CheckoutExample Module Template](https://github.com/hyva-themes/magento2-checkout-example), then you need to change the relative paths. For example in `src/components/DefaultRenderer.jsx`:

```diff
- import RadioInput from '../../../../components/common/Form/RadioInput';
+ import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
```
