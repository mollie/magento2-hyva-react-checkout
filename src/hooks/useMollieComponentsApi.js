import { useCallback, useEffect, useState } from 'react';
import { locale, profileId, testmode } from '../utility/config';

const useMollieComponentsApi = (methodCode, callback) => {
  const [mollie, setMollie] = useState();
  const mollieCallback = useCallback(callback, [callback]);

  useEffect(() => {
    let molliePromise;

    if (
      typeof profileId === 'undefined' ||
      typeof locale === 'undefined' ||
      typeof testmode === 'undefined' ||
      methodCode !== 'mollie_methods_creditcard'
    ) {
      return;
    }

    if (!molliePromise) {
      molliePromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'mollie-components-js';
        script.src = 'https://js.mollie.com/v1/mollie.js';
        script.addEventListener('load', () => {
          resolve(Mollie(profileId, { locale, testmode })); // eslint-disable-line no-undef
        });

        document.body.appendChild(script);
      });
    }

    molliePromise.then(setMollie);
  }, [methodCode]);

  useEffect(() => {
    if (mollie) {
      mollieCallback(mollie);
    }
  }, [mollieCallback, mollie]);
};

export default useMollieComponentsApi;
