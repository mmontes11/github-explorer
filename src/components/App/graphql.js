import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "../../graphql/fragment";

const NUM_REPOS = 10;

export const GET_ORGANIZATION = gql`
  query($organization: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repositories(
        first: ${NUM_REPOS}, 
        after: $cursor
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        edges {
          node {
            ...repository
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;
