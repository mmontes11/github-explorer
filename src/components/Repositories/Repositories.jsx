import React from "react";
import PropTypes from "prop-types";
import Repository from "components/Repository/Repository";

const Repositories = ({ repositories }) =>
  repositories.map(({ node }) => <Repository key={node.id} repository={node} />);

Repositories.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Repositories;
