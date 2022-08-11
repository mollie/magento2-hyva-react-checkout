import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

function Issuer({ issuer, checked, setSelectedIssuer }) {
  return (
    <div className="mt-2 form-control">
      <Field
        name={issuer.name}
        type="radio"
        id={issuer.code}
        checked={checked}
        className="form-radio"
        onChange={() => setSelectedIssuer(issuer.code)}
      />
      <label htmlFor={issuer.code} className="inline-block pl-2">
        <img
          src={issuer.image}
          alt={issuer.name}
          className="inline-block w-8 pr-2"
        />
        {issuer.name}
      </label>
    </div>
  );
}

Issuer.propTypes = {
  issuer: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    svg: PropTypes.string,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  setSelectedIssuer: PropTypes.func.isRequired,
};

export default Issuer;
