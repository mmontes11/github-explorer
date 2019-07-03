import { useReducer } from 'react';

const SET_INPUT = "SET_INPUT";
const SET_RESULT = "SET_RESULT";
const SET_ERROR = "SET_ERROR";

const setInput = input => ({
  type: SET_INPUT,
  input
});

const setResult = result => ({
  type: SET_RESULT,
  result
});

const setError = error => ({
  type: SET_ERROR,
  error
});

const initialState = {
  input: '',
  result: null,
  error: null
};

const reducer = (state, { type, input, result, error }) => {
  switch(type) {
    case SET_INPUT:
      return { ...state, input };
    case SET_RESULT:
      return { ...state, result };
    case SET_ERROR:
      return { ...state, error };
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
    error => dispatch(setError(error)),
  ];
}