import React from "react";
import PropTypes from "prop-types";
import ErrorHandler from "components/ui/Error/Error";
import Loader from "components/ui/Loader/Loader";
import Repositories from "components/Repositories/Repositories";
import Pager from "components/ui/Pager/Pager";
import { repositoriesUpdateQuery } from "components/Repositories/graphql";
import { NUM_ITEMS_PER_PAGE } from "constants/index";

const SearchResult = ({ data, loading, error, fetchMore }) => {
  if (error) {
    return <ErrorHandler error={error} />;
  }
  const { search } = data;
  if (loading && !search) {
    return search ? null : <Loader numPlaceholders={NUM_ITEMS_PER_PAGE} />;
  }
  const {
    edges,
    repositoryCount,
    pageInfo: { endCursor, hasNextPage },
  } = search;
  return (
    <>
      <Repositories repositories={edges} />
      {loading && <Loader numPlaceholders={NUM_ITEMS_PER_PAGE} />}
      <Pager
        progress={edges.length}
        total={repositoryCount}
        loading={loading}
        hasNextPage={hasNextPage}
        onFetchMore={() => fetchMore({ variables: { cursor: endCursor }, updateQuery: repositoriesUpdateQuery })}
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
