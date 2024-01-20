import React from "react";
import { getAccessToken } from "../utils/fetch";

export const AuthContext = React.createContext({
  auth: "",
  onSetAuth: (value = "") => {},
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState("");

  const onSetAuth = React.useCallback((value = "") => {
    setAuth(value);
  }, []);

  React.useEffect(() => {
    setAuth(getAccessToken() || "");
  }, []);

  return (
    <AuthContext.Provider value={{ auth, onSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}
