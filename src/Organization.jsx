import React from "react";
import PropTypes from "prop-types";
import Repositories from "./Repositories";

const Organization = ({ organization: { name, url, description, repositories }, onFetchOrzanization }) => (
  <>
    <a href={url} target="blank">
      <h4>{name}</h4>
    </a>
    <p>{description}</p>
    {repositories && (
      <Repositories organization={name} repositories={repositories} onFetchRepositories={onFetchOrzanization} />
    )}
  </>
);

Organization.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  onFetchOrzanization: PropTypes.func.isRequired,
};

export default Organization;
