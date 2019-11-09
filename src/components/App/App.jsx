import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Container } from "semantic-ui-react";
import Navbar from "components/ui/Navbar/Navbar";
import Search from "components/Search/Search";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: whitesmoke;
  }
`;

const Content = styled(Container)`
  margin-top: 3em;
  margin-bottom: 3em;
`;

const App = () => (
  <>
    <GlobalStyle />
    <Navbar />
    <Content>
      <Search />
    </Content>
  </>
);

export default App;
