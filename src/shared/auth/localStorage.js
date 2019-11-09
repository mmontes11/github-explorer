import { setItem, getItem, removeItem } from "shared/localStorage";

const tokenKey = "token";

export const setToken = token => setItem(tokenKey, token);
export const getToken = () => getItem(tokenKey);
export const removeToken = () => removeItem(tokenKey);
