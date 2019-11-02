import gql from "graphql-tag";

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    description
    url
    viewerHasStarred
    stargazers {
      totalCount
    }
  }
`;
