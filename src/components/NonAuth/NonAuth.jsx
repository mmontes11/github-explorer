import React from "react";
import { Message, Button, Icon, Label, Modal as SemanticModal, Input } from "semantic-ui-react";
import styled from "styled-components";
import { GITHUB_PERSONAL_ACCESS_TOKEN_URL } from "constants/index";
import { useModal } from "shared/modal";
import Modal from "shared/modal/Modal";

const MessageContent = styled(Message.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const NonAuth = () => {
  const { modal, actions } = useModal();
  const { openModal, closeModal } = actions;
  return (
    <>
      <Modal modal={modal} actions={actions}>
        <SemanticModal.Header>Provide Token</SemanticModal.Header>
        <SemanticModal.Content image>
          <Input placeholder="Personal Access Token" />
        </SemanticModal.Content>
        <SemanticModal.Actions>
          <Button secondary onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button primary onClick={() => closeModal()}>
            Accept
          </Button>
        </SemanticModal.Actions>
      </Modal>
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
          <Button color="black" onClick={() => openModal()}>
            <Icon name="github" /> Provide Token
          </Button>
        </MessageContent>
      </Message>
    </>
  );
};

export default NonAuth;
