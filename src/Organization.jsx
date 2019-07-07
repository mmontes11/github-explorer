import React from "react";
import PropTypes from "prop-types";
import Repositories from "./Repositories";

const Organization = ({ organization: { name, url, repositories }, loading, onFetchOrganization }) => (
  <>
    <a href={url} target="blank">
      <h4>{name}</h4>
    </a>
    {repositories && (
      <Repositories repositories={repositories} loading={loading} onFetchRepositories={onFetchOrganization} />
    )}
  </>
);

Organization.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  onFetchOrganization: PropTypes.func.isRequired,
};

export default Organization;
