import { LOCALSTORAGE_PREFIX } from "constants/index";

const withPrefix = key => `${LOCALSTORAGE_PREFIX}.${key}`;

export const setItem = (key, item) => window.localStorage.setItem(withPrefix(key), item);
export const getItem = key => window.localStorage.getItem(withPrefix(key));
export const removeItem = key => window.localStorage.removeItem(withPrefix(key));
