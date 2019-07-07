import React from "react";
import PropTypes from "prop-types";
import "./Error.css";

const Error = ({ error }) => <h4 className="error">{error.toString()}</h4>;

Error.propTypes = {
  error: PropTypes.shape({}).isRequired,
};

export default Error;
