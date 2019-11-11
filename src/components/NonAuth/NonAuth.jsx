import React from "react";
import { Message, Button, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import { GITHUB_PERSONAL_ACCESS_TOKEN_URL } from "constants/index";
import { useModal } from "shared/modal";
import TokenModal from "components/NonAuth/TokenModal/TokenModal";

const MessageContent = styled(Message.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const NonAuth = () => {
  const { modal, actions } = useModal();
  return (
    <>
      <TokenModal modal={modal} actions={actions} onCancel={() => {}} onAccept={() => {}} />
      <Message color="teal">
        <Message.Header>
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
        </Message.Header>
        <MessageContent>
          <Button secondary onClick={() => actions.openModal()}>
            <Icon name="github" /> Provide Token
          </Button>
        </MessageContent>
      </Message>
    </>
  );
};

export default NonAuth;
