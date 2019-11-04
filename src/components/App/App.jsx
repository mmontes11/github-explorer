import React from "react";
import { createGlobalStyle } from "styled-components";
import Search from "components/Search/Search";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 30px;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <h2>GitHub Explorer</h2>
    <Search />
  </>
);

export default App;
