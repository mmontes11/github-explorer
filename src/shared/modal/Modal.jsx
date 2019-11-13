import React from "react";
import PropTypes from "prop-types";
import { Modal as SemanticModal } from "semantic-ui-react";
import { ModalShape } from "shared/modal";

const defaultModalProps = {
  dimmer: "blurring",
  closeIcon: true,
};

const Modal = ({ modal, actions: { closeModal }, onClose, children }) => {
  const onCloseModal = () => {
    onClose();
    closeModal();
  };
  return (
    <SemanticModal {...{ ...defaultModalProps, ...modal }} onClose={onCloseModal}>
      {children}
    </SemanticModal>
  );
};

Modal.propTypes = {
  modal: ModalShape.modal.isRequired,
  actions: ModalShape.actions.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default Modal;
