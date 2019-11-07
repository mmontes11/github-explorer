import React from "react";
import { createGlobalStyle } from "styled-components";
import Navbar from "components/Navbar/Navbar";
import Search from "components/Search/Search";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: whitesmoke;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Navbar />
    <Search />
  </>
);

export default App;
