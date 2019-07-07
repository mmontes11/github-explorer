import React from "react";
import PropTypes from "prop-types";
import Repository from "./Repository";
import Loader from "./Loader";
import { repositoriesUpdateQuery } from "./apollo";
import "./Repositories.css";

const Repositories = ({
  repositories: {
    edges,
    totalCount,
    pageInfo: { endCursor, hasNextPage },
  },
  loading,
  onFetchRepositories,
}) => (
  <>
    {edges.map(({ node }) => (
      <Repository key={node.id} repository={node} />
    ))}
    <div className="footer">
      {loading && <Loader />}
      <span>
        {edges.length} / {totalCount}
      </span>
      {!loading && hasNextPage && (
        <button
          type="button"
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
  loading: PropTypes.bool.isRequired,
  onFetchRepositories: PropTypes.func.isRequired,
};

export default Repositories;
