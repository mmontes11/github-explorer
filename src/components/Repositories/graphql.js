export const repositoriesUpdateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }
  return {
    ...previousResult,
    organization: {
      ...previousResult.organization,
      repositories: {
        ...previousResult.organization.repositories,
        ...fetchMoreResult.organization.repositories,
        edges: [...previousResult.organization.repositories.edges, ...fetchMoreResult.organization.repositories.edges],
      },
    },
  };
};
