import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { getToken } from "./session";

export const isLoggedIn = () => {
  // Check if token exists or not
  const token = getToken("access_token");
  if (!token) return false;
  const { exp } = jwtDecode(token); // token expiration
  const now = moment(new Date().valueOf());
  const expDate = moment.unix(exp);
  // check if token has expired or not
  if (now > expDate) return false;
  return true;
};

export const isValidRoles = (role = []) => {
  // Check if user has proper role or not
  if (role === "") return true;
  const token = getToken("access_token");
  if (!token) return false;
  const { data: user } = jwtDecode(token);
  const isValid = role.some((r) => user.role.includes(r));
  if (!isValid) return false;
  return true;
};

export const setCurrentUser = () => {
  const token = getToken("access_token");
  const { data } = jwtDecode(token);
  localStorage.setItem("currentUser", JSON.stringify(data));
};
