import React from "react";
import { Query } from "react-apollo";
import { useOrganization } from "./organization";
import ErrorHandler from "./Error";
import Loader from "./Loader";
import Organization from "./Organization.jsx";
import { GET_ORGANIZATION } from "./apollo";
import "./App.css";

const App = () => {
  const [{ input, search }, setInput, setSearch] = useOrganization();
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
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Organization" onChange={onChange} value={input} className="search-input" />
        <button type="submit">Search</button>
      </form>
      {search && (
        <Query query={GET_ORGANIZATION} variables={{ organization: search }}>
          {({ data, loading, error, fetchMore }) => {
            if (error) {
              return <ErrorHandler error={error} />;
            }
            if (loading) {
              return <Loader />;
            }
            const { organization } = data;
            if (!organization) {
              return null;
            }
            return <Organization organization={organization} onFetchOrganization={fetchMore} />;
          }}
        </Query>
      )}
    </>
  );
};

export default App;
