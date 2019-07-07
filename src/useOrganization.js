import { useReducer } from "react";

const SET_INPUT = "SET_INPUT";
const SET_SEARCH = "SET_SEARCH";
const RESET_SEARCH = "RESET_SEARCH";

const setInput = input => ({
  type: SET_INPUT,
  input,
});

const setSearch = search => ({
  type: SET_SEARCH,
  search,
});

const resetSearch = () => ({
  type: RESET_SEARCH,
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
    case RESET_SEARCH:
      return { ...state, search: null };
    default:
      return initialState;
  }
};

export const useOrganization = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [
    state,
    input => dispatch(setInput(input)),
    search => dispatch(setSearch(search)),
    () => dispatch(resetSearch()),
  ];
};
