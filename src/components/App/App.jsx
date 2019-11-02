import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "semantic-ui-react";
import { useSearch } from "./useSearch";
import ErrorHandler from "../Error/Error";
import Loader from "../Loader/Loader";
import Repositories from "../Repositories/Repositories";
import { SEARCH } from "./graphql";
import "./App.css";

const renderResult = (data, loading, error, fetchMore) => {
  if (error) {
    return <ErrorHandler error={error} />;
  }
  const { search } = data;
  if (loading && !search) {
    return <Loader />;
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
      <h2>GitHub Explorer</h2>
      <form className="search-form" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Repositories"
          size="big"
          icon="search"
          loading={loading}
          onChange={onChange}
          value={input}
        />
      </form>
      {search && renderResult(data, loading, error, fetchMore)}
    </>
  );
};

export default App;
