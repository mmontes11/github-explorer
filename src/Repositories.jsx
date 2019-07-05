import React from "react";
import PropTypes from "prop-types";
import "./Repositories.css";

const Repositories = ({
  organization,
  repositories: {
    edges,
    totalCount,
    pageInfo: { endCursor, hasNextPage },
  },
  onFetchRepositories,
}) => (
  <>
    <ul>
      {edges.map(({ node: { id, name, url } }) => (
        <li key={id}>
          <a href={url} target="blank">
            {name}
          </a>
        </li>
      ))}
    </ul>
    <div className="footer">
      <span>
        {edges.length} / {totalCount}
      </span>
      {hasNextPage && (
        <button type="button" onClick={() => onFetchRepositories(organization, endCursor)}>
          More
        </button>
      )}
    </div>
  </>
);

Repositories.propTypes = {
  organization: PropTypes.string.isRequired,
  repositories: PropTypes.shape({}).isRequired,
  onFetchRepositories: PropTypes.func.isRequired,
};

export default Repositories;
