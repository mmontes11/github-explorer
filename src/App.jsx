import React from "react";
import githubClient from "./githubClient";
import { useOrganization } from "./organization";
import ErrorHandler from "./ErrorHandler";
import Organization from "./Organization.jsx";
import "./App.css";

const App = () => {
  const [
    { input: orgInput, result: orgResult, errors: orgErrors },
    setOrgInput,
    setOrgResult,
    setOrgErrors,
  ] = useOrganization();
  const onChange = ({ target: { value } }) => {
    setOrgInput(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    try {
      const { organization } = await githubClient.getOrganization(orgInput);
      setOrgResult(organization);
      setOrgErrors(null);
    } catch (errors) {
      setOrgErrors(errors);
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
      {orgErrors && orgErrors.length > 0 && <ErrorHandler errors={orgErrors} />}
      {orgResult && <Organization organization={orgResult} />}
    </>
  );
};

export default App;
