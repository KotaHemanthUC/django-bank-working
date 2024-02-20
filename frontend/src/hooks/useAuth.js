import React from "react";
import { getCurrentUser, apiLogin, apiLogout, apiSignup } from "../services/auth";


/**
 * Custom hook for authentication
 * @returns {Object} An object containing the current user, the user's authentication status, and functions to log in, log out, and sign up
 */

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem("access_token")
  );
  const [currentUser, setCurrentUser] = React.useState(null);

  const login = async (username, password) => {
    const response = await apiLogin(username, password);
    if (response.success) {
      setIsAuthenticated(true);
      refreshCurrentUser();
    }
    return response;
  };

  const logout = async () => {
    const success = await apiLogout();
    if (success) {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
    return success;
  };

  const signup = async (email, username, password) => {
    return await apiSignup(email, username, password);
  };

  const refreshCurrentUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  // Automatically check the current user's authentication status when the component mounts
  React.useEffect(() => {
    refreshCurrentUser();
  }, []);

  return { isAuthenticated, currentUser, login, logout, signup };
};

export default useAuth;
