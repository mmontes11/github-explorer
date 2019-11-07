import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import { useSearch } from "components/Search/useSearch";
import { SEARCH } from "components/Search/graphql";
import SearchResults from "components/Search/SearchResults/SearchResults";

const SearchForm = styled.form`
  margin-bottom: 3em;
`;

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
      <SearchForm onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Repositories"
          size="big"
          icon="search"
          loading={loading}
          onChange={onChange}
          value={input}
        />
      </SearchForm>
      {data && <SearchResults data={data} loading={loading} error={error} fetchMore={fetchMore} />}
    </>
  );
};

export default Search;
