import gql from "graphql-tag";

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    url
    viewerHasStarred
    stargazers {
      totalCount
    }
  }
`;
