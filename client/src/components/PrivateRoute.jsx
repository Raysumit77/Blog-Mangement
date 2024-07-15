import { Navigate } from "react-router-dom";
import { isLoggedIn, isValidRoles } from "../utils/login";

export const PrivateRoute = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && isValidRoles(role) ? (
        children
      ) : isLoggedIn() && !isValidRoles(role) ? (
        <Navigate replace to="/admin/profile" />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
};
