import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "components/Search/useSearch";
import { SEARCH, repositoriesUpdateQuery } from "components/Search/graphql";
import SearchBar from "components/Search/SearchBar/SearchBar";
import SearchResults from "components/Search/SearchResults/SearchResults";

const Search = () => {
  const [{ input, search }, { setInput, setSearch }] = useSearch();
  const onChange = ({ target: { value } }) => {
    setInput(value);
  };
  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      setSearch(input);
    },
    [input, setSearch],
  );
  const { data, loading, error, fetchMore } = useQuery(SEARCH, {
    variables: { query: search },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <>
      <SearchBar input={input} loading={loading} onChange={onChange} onSubmit={onSubmit} />
      {data && (
        <SearchResults
          data={data}
          loading={loading}
          error={error}
          onFetchMore={cursor => fetchMore({ variables: { cursor }, updateQuery: repositoriesUpdateQuery })}
        />
      )}
    </>
  );
};

export default Search;
