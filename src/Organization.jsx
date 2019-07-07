import React from "react";
import PropTypes from "prop-types";
import Repositories from "./Repositories";

const Organization = ({ organization: { name, url, repositories }, onFetchOrganization }) => (
  <>
    <a href={url} target="blank">
      <h4>{name}</h4>
    </a>
    {repositories && <Repositories repositories={repositories} onFetchRepositories={onFetchOrganization} />}
  </>
);

Organization.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  onFetchOrganization: PropTypes.func.isRequired,
};

export default Organization;
