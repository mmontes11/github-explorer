import React from "react";
import { useOrganization } from "./organization";
import ErrorHandler from "./Error";
import Loader from "./Loader";
import Organization from "./Organization.jsx";
import { Query } from "react-apollo";
import { GET_ORGANIZATION } from "./apollo";
import "./App.css";

const App = () => {
  const [
    { input, search, organization, errors },
    setInput,
    setSearch,
    setOrganization,
    setRepoStarred,
    setErrors,
  ] = useOrganization();
  // const fetchOrganization = async (organizationName, cursor) => {
  //   try {
  //     const { organization: newOrganization } = await githubClient.getOrganization(organizationName, cursor);
  //     setOrganization(newOrganization);
  //     setErrors(null);
  //   } catch (newErrors) {
  //     setErrors(newErrors);
  //     setOrganization(null);
  //   }
  // };
  // const toggleStarRepository = async (repositoryId, viewerHasStarred) => {
  //   try {
  //     const starred = viewerHasStarred
  //       ? (await githubClient.removeStarFromRepository(repositoryId)).removeStar
  //       : (await githubClient.addStarToRepository(repositoryId)).addStar;
  //     setRepoStarred(repositoryId, starred);
  //     setErrors(null);
  //   } catch (newErrors) {
  //     setErrors(newErrors);
  //     setOrganization(null);
  //   }
  // };
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
            return (
              <Organization
                organization={organization}
                onFetchOrganization={fetchMore}
                onToggleStarRepository={() => undefined}
              />
            );
          }}
        </Query>
      )}
    </>
  );
};

export default App;
