import React from "react";
import { Message, Button, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import { GITHUB_PERSONAL_ACCESS_TOKEN_URL } from "constants/index";

const { Header, Content: SemanticContent } = Message;

const Content = styled(SemanticContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const NonAuth = () => (
  <Message color="teal">
    <Header>
      <p>
        You must provide a{" "}
        <a href={GITHUB_PERSONAL_ACCESS_TOKEN_URL} target="blank">
          personal access token
        </a>{" "}
        with the permissions below for exploring GitHub:
      </p>
      <Label>notifications</Label>
      <Label>read:org</Label>
      <Label>repo</Label>
      <Label>user</Label>
    </Header>
    <Content>
      <Button color="black">
        <Icon name="github" /> Provide Token
      </Button>
    </Content>
  </Message>
);

export default NonAuth;
