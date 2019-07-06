import React from "react";
import PropTypes from "prop-types";
import Repositories from "./Repositories";

const Organization = ({ organization: { name, url, repositories }, onFetchOrzanization, onToggleStarRepository }) => (
  <>
    <a href={url} target="blank">
      <h4>{name}</h4>
    </a>
    {repositories && (
      <Repositories
        organization={name}
        repositories={repositories}
        onFetchRepositories={onFetchOrzanization}
        onToggleStarRepository={onToggleStarRepository}
      />
    )}
  </>
);

Organization.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  onFetchOrzanization: PropTypes.func.isRequired,
  onToggleStarRepository: PropTypes.func.isRequired,
};

export default Organization;
