import { useReducer } from "react";

const SET_INPUT = "SET_INPUT";
const SET_ORGANIZATION = "SET_ORGANIZATION";
const SET_ERRORS = "SET_ERRORS";

const setInput = input => ({
  type: SET_INPUT,
  input,
});

const setOrganization = organization => ({
  type: SET_ORGANIZATION,
  organization,
});

const setErrors = errors => ({
  type: SET_ERRORS,
  errors,
});

const initialState = {
  input: "",
  organization: null,
  erros: null,
};

const newRepositoriesState = (oldRepos, newRepos) => {
  if (!oldRepos) {
    return newRepos;
  }
  const { edges: oldEdges } = oldRepos;
  const { edges: newEdges } = newRepos;
  return {
    ...oldRepos,
    ...newRepos,
    edges: [...oldEdges, ...newEdges],
  };
};

const reducer = (state, { type, input, organization, errors }) => {
  switch (type) {
    case SET_INPUT:
      return { ...state, input };
    case SET_ORGANIZATION: {
      if (!organization) {
        return {
          ...state,
          organization: null,
        };
      }
      const reposFromState = state.organization && state.organization.repositories;
      const repositories = newRepositoriesState(reposFromState, organization.repositories);
      return {
        ...state,
        organization: {
          ...state.organization,
          ...organization,
          repositories,
        },
      };
    }
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
    organization => dispatch(setOrganization(organization)),
    errors => dispatch(setErrors(errors)),
  ];
};
