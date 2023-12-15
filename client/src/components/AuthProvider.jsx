import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const onLoginSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const onLogoutSuccess = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        onLoginSuccess,
        onLogoutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
