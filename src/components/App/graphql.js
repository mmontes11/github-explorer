import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "graphql/fragment";
import { NUM_REPOS_PER_PAGE } from "constants/pagination";

export const SEARCH = gql`
  query($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, after: $cursor, first: ${NUM_REPOS_PER_PAGE}) {
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
