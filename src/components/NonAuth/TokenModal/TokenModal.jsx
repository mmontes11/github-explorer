import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "shared/modal/Modal";
import { Button, Modal as SemanticModal, Header, Input, Grid } from "semantic-ui-react";
import { useAuth } from "shared/auth";
import { ModalShape } from "shared/modal";

const StyledInput = styled(Input)`
  && {
    display: flex;
  }
`;

const TokenModal = ({ modal, actions, onAccept }) => {
  const { closeModal } = actions;
  const { token: authToken } = useAuth();
  const [token, setToken] = useState(authToken || "");

  const accepButtonEnabled = token && token !== "";
  const resetInput = () => setToken(authToken || "");
  const onClose = () => resetInput();
  const onTokenChange = ({ target: { value } }) => setToken(value);
  const onCancelClick = () => {
    resetInput();
    closeModal();
  };
  const onAcceptClick = () => {
    onAccept(token);
    closeModal();
  };

  return (
    <Modal modal={modal} actions={actions} onClose={onClose}>
      <Header icon="github" content="Provide Token" />
      <SemanticModal.Content>
        <Grid stackable columns={2}>
          <Grid.Column>
            <StyledInput placeholder="Personal Access Token" value={token} onChange={onTokenChange} />
          </Grid.Column>
        </Grid>
      </SemanticModal.Content>
      <SemanticModal.Actions>
        <Button secondary onClick={onCancelClick}>
          Cancel
        </Button>
        <Button primary disabled={!accepButtonEnabled} onClick={onAcceptClick}>
          Accept
        </Button>
      </SemanticModal.Actions>
    </Modal>
  );
};

TokenModal.propTypes = {
  modal: ModalShape.modal.isRequired,
  actions: ModalShape.actions.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default TokenModal;
