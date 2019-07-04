import React from "react";
import PropTypes from "prop-types";

const ErrorHandler = ({ errors }) => (
  <>
    {errors.map(({ type, message }) => (
      <h4 key={type} className="error">
        {message}
      </h4>
    ))}
  </>
);
ErrorHandler.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ErrorHandler;
