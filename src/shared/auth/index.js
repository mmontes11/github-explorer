import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import * as localStorage from "shared/auth/localStorage";

export const AuthContext = createContext({
  token: null,
});

export const AuthProvider = props => {
  const [token, setTokenState] = useState(localStorage.getToken());
  const setToken = newToken => {
    localStorage.setToken(newToken);
    setTokenState(newToken);
  };
  const auth = useMemo(
    () => ({
      isAuth: token !== null,
      token,
      setToken,
    }),
    [token],
  );
  return <AuthContext.Provider value={auth} {...props} />;
};

export const AuthShape = PropTypes.shape({
  isAuth: PropTypes.bool,
  token: PropTypes.string,
  setToken: PropTypes.func,
});

export const useAuth = () => useContext(AuthContext);

export const withAuth = Component => props => {
  const auth = useAuth();
  return <Component auth={auth} {...props} />;
};
