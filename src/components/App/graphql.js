import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "../../graphql/fragment";

const NUM_REPOS = 10;

export const SEARCH = gql`
  query($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, after: $cursor, first: ${NUM_REPOS}) {
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
