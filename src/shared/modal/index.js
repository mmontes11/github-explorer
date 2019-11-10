import React, { createContext, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";

const noop = () => {};

const initialState = {
  open: false,
  onClose: noop,
};

const OPEN_MODAL_ACTION = "OPEN_MODAL_ACTION";
const CLOSE_MODAL_ACTION = "CLOSE_MODAL_ACTION";

const openModalAction = props => ({
  type: OPEN_MODAL_ACTION,
  ...props,
});

const closeModalAction = props => ({
  type: CLOSE_MODAL_ACTION,
  ...props,
});

const reducer = (state, { type, ...props }) => {
  switch (type) {
    case OPEN_MODAL_ACTION:
      return { ...state, ...props, open: true };
    case CLOSE_MODAL_ACTION:
      return { ...state, ...props, open: false };
    default:
      return state;
  }
};

export const ModalContext = createContext({
  ...initialState,
  openModal: noop,
  closeModal: noop,
});

export const ModalProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openModal = useCallback(() => dispatch(openModalAction(props)), [dispatch]);
  const closeModal = useCallback(() => dispatch(closeModalAction(props)), [dispatch]);
  const modal = { ...state, openModal, closeModal };
  return <ModalContext.Provider value={modal} {...props} />;
};

export const ModalShape = PropTypes.shape({
  open: PropTypes.bool,
  onClose: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
});

export const useModal = () => useContext(ModalContext);

export const withModal = Component => props => {
  const modal = useModal();
  return <Component modal={modal} {...props} />;
};
