import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import client from "./apollo";
import "./index.css";
import "dotenv/config";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
);
