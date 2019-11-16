import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "components/Search/useSearch";
import { useAuth } from "shared/auth";
import { SEARCH, repositoriesUpdateQuery } from "components/Search/graphql";
import SearchBar from "components/Search/SearchBar/SearchBar";
import SearchResults from "components/Search/SearchResults/SearchResults";

const Search = () => {
  const [{ input, search, isNewSearch }, { setInput, setSearch, setIsNewSearch }] = useSearch();
  const { data, loading, error, fetchMore } = useQuery(SEARCH, {
    variables: { query: search },
    notifyOnNetworkStatusChange: true,
  });
  const { removeToken, isAuthError } = useAuth();
  if (isAuthError(error)) {
    removeToken();
  }
  const onChange = useCallback(({ target: { value } }) => setInput(value), [setInput]);
  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      setSearch(input);
    },
    [input, setSearch],
  );
  const onFetchMore = useCallback(
    cursor => {
      setIsNewSearch(false);
      fetchMore({ variables: { cursor }, updateQuery: repositoriesUpdateQuery });
    },
    [setIsNewSearch, fetchMore],
  );
  return (
    <>
      <SearchBar input={input} loading={loading} onChange={onChange} onSubmit={onSubmit} />
      {(data || (search && loading)) && (
        <SearchResults
          data={data}
          error={error}
          loading={loading}
          isNewSearch={isNewSearch}
          onFetchMore={onFetchMore}
        />
      )}
    </>
  );
};

export default Search;
