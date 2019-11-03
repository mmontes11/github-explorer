import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "semantic-ui-react";
import styled, { createGlobalStyle } from "styled-components";
import { useSearch } from "components/App/useSearch";
import { SEARCH } from "components/App/graphql";
import ErrorHandler from "components/Error/Error";
import Loader from "components/Loader/Loader";
import Repositories from "components/Repositories/Repositories";
import { NUM_REPOS_PER_PAGE } from "constants/pagination";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 30px;
  }
`;

const SearchForm = styled.form`
  margin-bottom: 20px;
`;

const renderResult = (data, loading, error, fetchMore) => {
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

const App = () => {
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
      <GlobalStyle />
      <h2>GitHub Explorer</h2>
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
      {search && renderResult(data, loading, error, fetchMore)}
    </>
  );
};

export default App;
