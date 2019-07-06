import React from "react";
import PropTypes from "prop-types";
import Repository from "./Repository";
import { repositoriesUpdateQuery } from "./apollo";
import "./Repositories.css";

const Repositories = ({
  repositories: {
    edges,
    totalCount,
    pageInfo: { endCursor, hasNextPage },
  },
  onFetchRepositories,
  onToggleStarRepository,
}) => (
  <>
    {edges.map(({ node }) => (
      <Repository key={node.id} repository={node} onToggleStarRepository={onToggleStarRepository} />
    ))}
    <div className="footer">
      <span>
        {edges.length} / {totalCount}
      </span>
      {hasNextPage && (
        <button
          type="button"
          className="more-button"
          onClick={() =>
            onFetchRepositories({ variables: { cursor: endCursor }, updateQuery: repositoriesUpdateQuery })
          }
        >
          <span role="img" aria-label="More">
            ➕
          </span>
        </button>
      )}
    </div>
  </>
);

Repositories.propTypes = {
  repositories: PropTypes.shape({}).isRequired,
  onFetchRepositories: PropTypes.func.isRequired,
  onToggleStarRepository: PropTypes.func.isRequired,
};

export default Repositories;
