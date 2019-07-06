import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const NUM_REPOS = 10;

export const GET_ORGANIZATION = gql`
  query($organization: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repositories(
        first: ${NUM_REPOS}, 
        after: $cursor
      ) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
            stargazers {
              totalCount
            }
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
`;

export const ADD_STAR = gql`
  mutation($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`;

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

const GITHUB_BASE_URL = "https://api.github.com/graphql";
const authorization = `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`;
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization,
  },
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;
