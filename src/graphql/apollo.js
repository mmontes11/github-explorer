import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { GITHUB_BASE_URL } from "constants/index";
import { getToken } from "shared/auth/localStorage";

const authorization = `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`;
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization,
  },
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
