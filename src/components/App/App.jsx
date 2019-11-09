import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Container } from "semantic-ui-react";
import { useAuth } from "shared/auth";
import Navbar from "components/ui/Navbar/Navbar";
import Search from "components/Search/Search";
import NonAuth from "components/NonAuth/NonAuth";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: whitesmoke;
  }
`;

const Content = styled(Container)`
  margin-top: 3em;
  margin-bottom: 3em;
`;

const App = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Content>{isAuth ? <Search /> : <NonAuth />}</Content>
    </>
  );
};

export default App;
