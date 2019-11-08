import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Error from "components/ui/Error/Error";
import CardLoader from "components/ui/CardLoader/CardLoader";
import Repository from "components/Repository/Repository";
import Pager from "components/ui/Pager/Pager";
import { NUM_ITEMS_PER_PAGE } from "constants/index";

const loaders = Array(NUM_ITEMS_PER_PAGE)
  .fill(null)
  .map(() => <CardLoader key={shortid.generate()} />);

const ResultsGrid = ({ children }) => <div className="ui four doubling stackable cards">{children}</div>;

ResultsGrid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const SearchResults = ({ data, loading, error, onFetchMore }) => {
  const { search } = data;
  const { edges = [], repositoryCount = 0, pageInfo = {} } = search || {};
  const { endCursor, hasNextPage } = pageInfo;
  if (error) {
    return <Error error={error} />;
  }
  if (loading && !search) {
    return <ResultsGrid>{loaders}</ResultsGrid>;
  }
  return (
    <>
      <ResultsGrid>
        {edges.map(({ node }) => (
          <Repository key={node.id} repository={node} />
        ))}
        {loading && loaders}
      </ResultsGrid>
      <Pager
        progress={edges.length}
        total={repositoryCount}
        loading={loading}
        hasNextPage={hasNextPage}
        onFetchMore={() => onFetchMore(endCursor)}
      />
    </>
  );
};

SearchResults.propTypes = {
  data: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  onFetchMore: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  data: null,
  error: null,
};

export default SearchResults;
