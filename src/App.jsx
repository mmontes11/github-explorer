import React from "react";
import githubClient from "./githubClient";
import { useOrganization } from "./organization";
import ErrorHandler from "./ErrorHandler";
import Organization from "./Organization.jsx";
import "./App.css";

const App = () => {
  const [{ input, organization, errors }, setInput, setOrganization, setRepoStarred, setErrors] = useOrganization();
  const fetchOrganization = async (organizationName, cursor) => {
    try {
      const { organization: newOrganization } = await githubClient.getOrganization(organizationName, cursor);
      setOrganization(newOrganization);
      setErrors(null);
    } catch (newErrors) {
      setErrors(newErrors);
      setOrganization(null);
    }
  };
  const toggleStarRepository = async (repositoryId, viewerHasStarred) => {
    try {
      const starred = viewerHasStarred
        ? (await githubClient.removeStarFromRepository(repositoryId)).removeStar
        : (await githubClient.addStarToRepository(repositoryId)).addStar;
      setRepoStarred(repositoryId, starred);
      setErrors(null);
    } catch (newErrors) {
      setErrors(newErrors);
      setOrganization(null);
    }
  };
  const onChange = ({ target: { value } }) => {
    setInput(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    setOrganization(null);
    fetchOrganization(input);
  };
  return (
    <>
      <h2>GitHub Explorer</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Organization" onChange={onChange} value={input} className="search-input" />
        <button type="submit">Search</button>
      </form>
      {errors && errors.length > 0 && <ErrorHandler errors={errors} />}
      {organization && (
        <Organization
          organization={organization}
          onFetchOrzanization={fetchOrganization}
          onToggleStarRepository={toggleStarRepository}
        />
      )}
    </>
  );
};

export default App;
