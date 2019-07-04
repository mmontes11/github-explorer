import { useReducer } from "react";

const SET_INPUT = "SET_INPUT";
const SET_RESULT = "SET_RESULT";
const SET_ERRORS = "SET_ERRORS";

const setInput = input => ({
  type: SET_INPUT,
  input,
});

const setResult = result => ({
  type: SET_RESULT,
  result,
});

const setErrors = errors => ({
  type: SET_ERRORS,
  errors,
});

const initialState = {
  input: "",
  result: null,
  erros: null,
};

const reducer = (state, { type, input, result, errors }) => {
  switch (type) {
    case SET_INPUT:
      return { ...state, input };
    case SET_RESULT:
      return { ...state, result };
    case SET_ERRORS:
      return { ...state, errors };
    default:
      return initialState;
  }
};

export const useOrganization = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [
    state,
    input => dispatch(setInput(input)),
    result => dispatch(setResult(result)),
    errors => dispatch(setErrors(errors)),
  ];
};
