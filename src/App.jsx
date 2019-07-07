import React from "react";
import { Query } from "react-apollo";
import { useOrganization } from "./useOrganization";
import ErrorHandler from "./Error";
import Loader from "./Loader";
import Organization from "./Organization";
import { GET_ORGANIZATION } from "./apollo";
import "./App.css";

const App = () => {
  const [{ input, search }, setInput, setSearch, resetSearch] = useOrganization();
  const onChange = ({ target: { value } }) => {
    setInput(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    setSearch(input);
  };
  return (
    <>
      <h2>GitHub Explorer</h2>
      <form className="search-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Organization" onChange={onChange} value={input} className="search-input" />
        <button type="submit">
          <span role="img" aria-label="Search">
            🔍
          </span>
        </button>
        <button type="button" onClick={() => resetSearch()}>
          <span role="img" aria-label="Reset">
            ❌
          </span>
        </button>
      </form>
      {search && (
        <Query query={GET_ORGANIZATION} variables={{ organization: search }} notifyOnNetworkStatusChange>
          {({ data, loading, error, fetchMore }) => {
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
          }}
        </Query>
      )}
    </>
  );
};

export default App;
