import "dotenv/config";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "components/App/App";
import { AuthProvider } from "shared/auth";
import { ModalProvider } from "shared/modal";
import client from "graphql/apollo";

render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
