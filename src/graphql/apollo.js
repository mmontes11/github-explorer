import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const NUM_REPOS = 10;
const ADD_STAR_PAYLOAD_PROP = "addStar";
const REMOVE_STAR_PAYLOAD_PROP = "removeStar";

const REPOSITORY_FRAGMENT = gql`
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

const toggleStar = payloadProp => gql`
  mutation($id: ID!) {
    ${payloadProp}(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`;

export const ADD_STAR = toggleStar(ADD_STAR_PAYLOAD_PROP);

export const REMOVE_STAR = toggleStar(REMOVE_STAR_PAYLOAD_PROP);

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

const toggleStarOptimisticResponse = (payloadProp, id, viewerHasStarred, totalCount) => ({
  [payloadProp]: {
    __typename: "Mutation",
    starrable: {
      __typename: "Repository",
      id,
      viewerHasStarred,
      stargazers: {
        __typename: "StargazerConnection",
        totalCount,
      },
    },
  },
});

export const addStarOptimisticResponse = (id, totalCount) =>
  toggleStarOptimisticResponse(ADD_STAR_PAYLOAD_PROP, id, true, totalCount);

export const removeStarOptimisticResponse = (id, totalCount) =>
  toggleStarOptimisticResponse(REMOVE_STAR_PAYLOAD_PROP, id, false, totalCount);

const toggleStarUpdate = (payloadProp, viewerHasStarred) => (
  client,
  {
    data: {
      [payloadProp]: {
        starrable: { id },
      },
    },
  },
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      viewerHasStarred,
    },
  });
};

export const addStarUpdate = toggleStarUpdate(ADD_STAR_PAYLOAD_PROP, true);

export const removeStarUpdate = toggleStarUpdate(REMOVE_STAR_PAYLOAD_PROP, false);

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
