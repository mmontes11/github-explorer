import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const Error = ({ error, icon }) => <Message icon={icon} header={error.message} negative />;

Error.propTypes = {
  error: PropTypes.shape({}).isRequired,
  icon: PropTypes.string,
};

Error.defaultProps = {
  icon: "exclamation triangle",
};

export default Error;
