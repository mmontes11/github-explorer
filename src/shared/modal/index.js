import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const noop = () => {};

const initialState = {
  open: false,
};

const OPEN_MODAL_ACTION = "OPEN_MODAL_ACTION";
const CLOSE_MODAL_ACTION = "CLOSE_MODAL_ACTION";

const openModalAction = props => ({ type: OPEN_MODAL_ACTION, ...props });

const closeModalAction = () => ({ type: CLOSE_MODAL_ACTION });

const reducer = (state, { type, ...props }) => {
  switch (type) {
    case OPEN_MODAL_ACTION:
      return { ...initialState, ...props, open: true };
    case CLOSE_MODAL_ACTION:
      return initialState;
    default:
      return state;
  }
};

export const ModalContext = createContext({
  modal: initialState,
  actions: {
    openModal: noop,
    closeModal: noop,
  },
});

export const ModalProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openModal = useCallback(modalProps => dispatch(openModalAction(modalProps)), [dispatch]);
  const closeModal = useCallback(() => dispatch(closeModalAction()), [dispatch]);
  const value = useMemo(() => ({ modal: state, actions: { openModal, closeModal } }), [state, openModal, closeModal]);
  return <ModalContext.Provider value={value} {...props} />;
};

export const ModalShape = {
  modal: PropTypes.shape({
    open: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
  }),
};

export const useModal = () => useContext(ModalContext);

export const withModal = Component => props => {
  const modal = useModal();
  return <Component modal={modal} {...props} />;
};
