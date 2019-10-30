import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "./useSearch";
import ErrorHandler from "../Error/Error";
import Loader from "../Loader/Loader";
import Organization from "../Organization/Organization";
import { GET_ORGANIZATION } from "./graphql";
import "./App.css";

const renderResult = (data, loading, error, fetchMore) => {
  if (error) {
    return <ErrorHandler error={error} />;
  }
  const { organization } = data;
  if (loading && !organization) {
    return <Loader />;
  }
  if (!organization) {
    return null;
  }
  return <Organization organization={organization} loading={loading} onFetchOrganization={fetchMore} />;
};

const App = () => {
  const [{ input, search }, { setInput, setSearch, reset }] = useSearch();
  const onChange = ({ target: { value } }) => {
    setInput(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    setSearch(input);
  };
  const { data, loading, error, fetchMore } = useQuery(GET_ORGANIZATION, {
    variables: { organization: search },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <>
      <h2>GitHub Explorer</h2>
      <form className="search-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Organization" onChange={onChange} value={input} />
        <button type="submit">
          <span role="img" aria-label="Search">
            🔍
          </span>
        </button>
        <button type="button" onClick={() => reset()}>
          <span role="img" aria-label="Reset">
            ❌
          </span>
        </button>
      </form>
      {search && renderResult(data, loading, error, fetchMore)}
    </>
  );
};

export default App;
