import { useReducer, useCallback } from "react";

const SET_INPUT = "SET_INPUT";
const SET_SEARCH = "SET_SEARCH";
const RESET = "RESET";

const setInputAction = input => ({
  type: SET_INPUT,
  input,
});

const setSearchAction = search => ({
  type: SET_SEARCH,
  search,
});

const resetAction = () => ({
  type: RESET,
});

const initialState = {
  input: "",
  search: null,
};

const reducer = (state, { type, input, search }) => {
  switch (type) {
    case SET_INPUT:
      return { ...state, input };
    case SET_SEARCH:
      return { ...state, search };
    case RESET:
      return initialState;
    default:
      return initialState;
  }
};

export const useSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setInput = useCallback(input => dispatch(setInputAction(input)), [dispatch]);
  const setSearch = useCallback(search => dispatch(setSearchAction(search)), [dispatch]);
  const reset = useCallback(() => dispatch(resetAction), [dispatch]);
  return [
    state,
    {
      setInput,
      setSearch,
      reset,
    },
  ];
};
