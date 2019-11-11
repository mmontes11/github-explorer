import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "shared/modal/Modal";
import { Button, Modal as SemanticModal, Header, Input, Grid } from "semantic-ui-react";
import { ModalShape } from "shared/modal";

const StyledInput = styled(Input)`
  && {
    display: flex;
  }
`;

const TokenModal = ({ modal, actions, onCancel, onAccept }) => {
  const { closeModal } = actions;
  const onCancelClick = () => {
    closeModal();
    onCancel();
  };
  const onAcceptClick = () => {
    closeModal();
    onAccept();
  };
  return (
    <Modal modal={modal} actions={actions}>
      <Header icon="github" content="Provide Token" />
      <SemanticModal.Content>
        <Grid stackable columns={2}>
          <Grid.Column>
            <StyledInput placeholder="Personal Access Token" />
          </Grid.Column>
        </Grid>
      </SemanticModal.Content>
      <SemanticModal.Actions>
        <Button secondary onClick={onCancelClick}>
          Cancel
        </Button>
        <Button primary onClick={onAcceptClick}>
          Accept
        </Button>
      </SemanticModal.Actions>
    </Modal>
  );
};

TokenModal.propTypes = {
  modal: ModalShape.modal.isRequired,
  actions: ModalShape.actions.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default TokenModal;
