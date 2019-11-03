import React from "react";
import PropTypes from "prop-types";
import Repository from "../Repository/Repository";
import Loader from "../Loader/Loader";
import { repositoriesUpdateQuery } from "./graphql";

const Repositories = ({
  repositories: {
    edges,
    repositoryCount,
    pageInfo: { endCursor, hasNextPage },
  },
  loading,
  fetchMore,
}) => (
  <>
    {edges.map(({ node }) => (
      <Repository key={node.id} repository={node} />
    ))}
    <div className="footer">
      {loading && <Loader />}
      <span>
        {edges.length} / {repositoryCount}
      </span>
      {!loading && hasNextPage && (
        <button
          type="button"
          onClick={() => fetchMore({ variables: { cursor: endCursor }, updateQuery: repositoriesUpdateQuery })}
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
  fetchMore: PropTypes.func.isRequired,
};

export default Repositories;
