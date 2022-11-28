import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function MollieComponent({ mollie, type, label }) {
  const reference = React.createRef();
  const [errorMessage, setErrorMessage] = useState();
  const [componentObject, setComponent] = useState();

  useEffect(() => {
    if (mollie && !componentObject) {
      const component = mollie.createComponent(type);
      component.mount(reference.current);
      component.addEventListener('change', (event) => {
        if (event.error && event.touched) {
          setErrorMessage(event.error);
        } else {
          setErrorMessage(false);
        }
      });

      setComponent(component);
    }

    // Specifies how to clean up the effect:
    return () => {
      if (componentObject) {
        componentObject.unmount();
      }
    };
  }, [mollie, componentObject]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <label className="label" htmlFor={type}>
        {label}
      </label>
      <div className="form-input p-2" ref={reference} />
      {errorMessage && (
        <div className="pb-2" style={{ color: 'rgb(239, 68, 68)' }}>
          {errorMessage}
        </div>
      )}
      <div id="card-holder-error" />
    </div>
  );
}

MollieComponent.propTypes = {
  mollie: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MollieComponent;
