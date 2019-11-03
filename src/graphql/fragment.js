import gql from "graphql-tag";

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    description
    url
    owner {
      login
      url
    }
    viewerHasStarred
    stargazers {
      totalCount
    }
    viewerCanSubscribe
    viewerSubscription
    watchers {
      totalCount
    }
  }
`;
