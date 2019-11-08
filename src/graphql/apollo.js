import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GITHUB_BASE_URL } from "constants/index";

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
