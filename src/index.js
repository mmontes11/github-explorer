import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "dotenv/config";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App/App";
import client from "./graphql/apollo";

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
);
