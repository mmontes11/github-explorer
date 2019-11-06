import React from "react";
import PropTypes from "prop-types";

const Pager = ({ progress, total, showFetchMore, onFetchMore }) => (
  <>
    <span>
      {progress} / {total}
    </span>
    {showFetchMore && (
      <button type="button" onClick={() => onFetchMore()}>
        <span role="img" aria-label="More">
          ➕
        </span>
      </button>
    )}
  </>
);

Pager.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  showFetchMore: PropTypes.bool.isRequired,
  onFetchMore: PropTypes.func.isRequired,
};

export default Pager;
