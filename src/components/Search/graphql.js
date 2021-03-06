import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "graphql/fragment";
import { NUM_ITEMS_PER_PAGE } from "constants/index";

export const SEARCH = gql`
  query($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, after: $cursor, first: ${NUM_ITEMS_PER_PAGE}) {
      edges {
        node {
          ...repository
        }
      }
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

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
