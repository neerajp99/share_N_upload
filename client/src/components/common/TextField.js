import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  info,
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
      />
      {info && <small className="form-text text-muted ">{info}</small>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextField;
