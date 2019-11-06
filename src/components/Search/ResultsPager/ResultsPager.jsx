import React from "react";
import PropTypes from "prop-types";

const ResultsPager = ({ progress, total, loading, hasNextPage, onFetchMore }) => (
  <>
    <span>
      {progress} / {total}
    </span>
    {!loading && hasNextPage && (
      <button type="button" onClick={() => onFetchMore()}>
        <span role="img" aria-label="More">
          ➕
        </span>
      </button>
    )}
  </>
);

ResultsPager.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  onFetchMore: PropTypes.func.isRequired,
};

export default ResultsPager;
