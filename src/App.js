import React from "react";
import githubClient from "./githubClient";
import { useOrganization } from "./organization";
import "./App.css";

const App = () => {
  const [
    { input: orgInput, result: orgResult, error: orgError },
    setOrgInput,
    setOrgResult,
    setOrgError,
  ] = useOrganization();
  const onChange = ({ target: { value } }) => {
    setOrgInput(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    try {
      const { organization } = await githubClient.getOrganization(orgInput);
      setOrgResult(organization);
      setOrgError(null);
    } catch (errors) {
      setOrgError(new Error("Not found"));
      setOrgResult(null);
    }
  };
  return (
    <>
      <h2>GitHub Explorer</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Organization" onChange={onChange} value={orgInput} className="search-input" />
        <button type="submit">Search</button>
      </form>
      {orgError && <h4 className="error">{orgError.message}</h4>}
      {orgResult && (
        <a href={orgResult.url} target="blank">
          <h4>{orgResult.name}</h4>
        </a>
      )}
    </>
  );
};

export default App;
