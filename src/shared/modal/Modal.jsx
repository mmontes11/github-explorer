import React from "react";
import PropTypes from "prop-types";
import { Modal as SemanticModal } from "semantic-ui-react";
import { ModalShape } from "shared/modal";

const defaultModalProps = {
  dimmer: "blurring",
};

const Modal = ({ modal, actions: { closeModal }, children }) => (
  <SemanticModal {...{ ...defaultModalProps, ...modal }} onClose={() => closeModal()}>
    {children}
  </SemanticModal>
);

Modal.propTypes = {
  modal: ModalShape.modal.isRequired,
  actions: ModalShape.actions.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
