import React from "react";
import PropTypes from "prop-types";

const Organization = ({
  organization: {
    name,
    url,
    description,
    repositories: { edges: repos },
  },
}) => (
  <>
    <a href={url} target="blank">
      <h4>{name}</h4>
    </a>
    <p>{description}</p>
    {repos.length > 0 && (
      <ul>
        {repos.map(({ node: { name: repoName, url: repoUrl } }) => (
          <li key={repoName}>
            <a href={repoUrl} target="blank">
              {repoName}
            </a>
          </li>
        ))}
      </ul>
    )}
  </>
);

Organization.propTypes = {
  organization: PropTypes.shape({}).isRequired,
};

export default Organization;
