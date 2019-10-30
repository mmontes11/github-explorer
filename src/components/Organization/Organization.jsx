import React from "react";
import PropTypes from "prop-types";
import Repositories from "../Repositories/Repositories";

const Organization = ({ organization: { name, url, repositories }, loading, fetchMore }) => (
  <>
    <a href={url} target="blank">
      <h4>{name}</h4>
    </a>
    {repositories && <Repositories repositories={repositories} loading={loading} fetchMore={fetchMore} />}
  </>
);

Organization.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default Organization;
