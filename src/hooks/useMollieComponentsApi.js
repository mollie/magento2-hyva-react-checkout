import { useEffect, useState, useCallback } from 'react';
import { locale, profileId, testmode } from '../utility/config';

const useMollieComponentsApi = (callback) => {
  let molliePromise;
  const [mollie, setMollie] = useState();
  const mollieCallback = useCallback(callback, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (mollie) {
      mollieCallback(mollie);
    }
  }, [mollie]);
};

export default useMollieComponentsApi;
