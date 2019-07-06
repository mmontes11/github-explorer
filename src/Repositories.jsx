import React from "react";
import PropTypes from "prop-types";
import Repository from "./Repository";
import "./Repositories.css";

const Repositories = ({
  organization,
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
        <button type="button" className="more-button" onClick={() => onFetchRepositories(organization, endCursor)}>
          <span role="img" aria-label="More">
            ➕
          </span>
        </button>
      )}
    </div>
  </>
);

Repositories.propTypes = {
  organization: PropTypes.string.isRequired,
  repositories: PropTypes.shape({}).isRequired,
  onFetchRepositories: PropTypes.func.isRequired,
  onToggleStarRepository: PropTypes.func.isRequired,
};

export default Repositories;
