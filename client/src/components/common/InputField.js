import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({ name, value, placeholder, onChange, icon, type }) => {
  return (
    <div className="form-group">
      <small className="form-text text-left">label</small>
      <input
        className="form-control form-control-lg text-field"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

InputGroup.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  // option: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;