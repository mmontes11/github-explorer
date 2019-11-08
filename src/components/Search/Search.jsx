import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "components/Search/useSearch";
import { SEARCH } from "components/Search/graphql";
import SearchBar from "components/Search/SearchBar/SearchBar";
import SearchResults from "components/Search/SearchResults/SearchResults";

const Search = () => {
  const [{ input, search }, { setInput, setSearch }] = useSearch();
  const onChange = ({ target: { value } }) => {
    setInput(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    setSearch(input);
  };
  const { data, loading, error, fetchMore } = useQuery(SEARCH, {
    variables: { query: search },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <>
      <SearchBar input={input} loading={loading} onChange={onChange} onSubmit={onSubmit} />
      {data && <SearchResults data={data} loading={loading} error={error} fetchMore={fetchMore} />}
    </>
  );
};

export default Search;
