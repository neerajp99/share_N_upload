import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  error,
  label
}) => {
  return (
    <div className="form-group">
      {label && <small className="form-text text-left">{label}</small>}
      <input
        className="form-control form-control-lg text-field"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        id = {error ? "auth-error": ""}
      />
      {error && <small className="form-text auth-error ">{error}</small>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextField;
