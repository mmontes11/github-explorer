import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ErrorHandler from "components/ui/Error/Error";
import Loader from "components/ui/Loader/Loader";
import Repositories from "components/Repositories/Repositories";
import Pager from "components/ui/Pager/Pager";
import { repositoriesUpdateQuery } from "components/Repositories/graphql";
import { NUM_ITEMS_PER_PAGE } from "constants/index";

const SearchResult = ({ data, loading, error, fetchMore }) => {
  const { search } = data;
  const { edges = [], repositoryCount = 0, pageInfo = {} } = search || {};
  const { endCursor, hasNextPage } = pageInfo;
  const onFetchMore = useCallback(fetchMore, [endCursor]);
  if (error) {
    return <ErrorHandler error={error} />;
  }
  if (loading && !search) {
    return <Loader numPlaceholders={NUM_ITEMS_PER_PAGE} />;
  }
  return (
    <>
      <Repositories repositories={edges} />
      {loading && <Loader numPlaceholders={NUM_ITEMS_PER_PAGE} />}
      <Pager
        progress={edges.length}
        total={repositoryCount}
        loading={loading}
        hasNextPage={hasNextPage}
        onFetchMore={() => onFetchMore({ variables: { cursor: endCursor }, updateQuery: repositoriesUpdateQuery })}
      />
    </>
  );
};

SearchResult.propTypes = {
  data: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  fetchMore: PropTypes.func.isRequired,
};

SearchResult.defaultProps = {
  data: null,
  error: null,
};

export default SearchResult;
