export const repositoriesUpdateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }
  return {
    ...previousResult,
    search: {
      ...previousResult.search,
      ...fetchMoreResult.search,
      edges: [...previousResult.search.edges, ...fetchMoreResult.search.edges],
    },
  };
};
