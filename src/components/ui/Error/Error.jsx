import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const { Header } = Message;

const Error = ({ error }) => (
  <Message negative>
    <Header>{error.toString()}</Header>
  </Message>
);

Error.propTypes = {
  error: PropTypes.shape({}).isRequired,
};

export default Error;
