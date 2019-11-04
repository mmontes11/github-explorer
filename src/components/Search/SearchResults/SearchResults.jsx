import React from "react";
import PropTypes from "prop-types";
import ErrorHandler from "components/Error/Error";
import Loader from "components/Loader/Loader";
import Repositories from "components/Repositories/Repositories";
import { NUM_REPOS_PER_PAGE } from "constants/pagination";

const SearchResult = ({ data, loading, error, fetchMore }) => {
  if (error) {
    return <ErrorHandler error={error} />;
  }
  const { search } = data;
  if (loading && !search) {
    return <Loader numPlaceholders={NUM_REPOS_PER_PAGE} />;
  }
  if (!search) {
    return null;
  }
  return <Repositories repositories={search} loading={loading} fetchMore={fetchMore} />;
};

SearchResult.propTypes = {
  data: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  fetchMore: PropTypes.func.isRequired,
};

SearchResult.defaultProps = {
  error: null,
};

export default SearchResult;
