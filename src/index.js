import "dotenv/config";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "components/App/App";
import { AuthProvider } from "shared/auth";
import client from "graphql/apollo";

render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
