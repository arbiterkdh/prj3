import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [expired, setExpired] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  function hasAccess(param) {
    return id == param;
  }

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
  }

  function logout() {
    localStorage.removeItem("token");
    setId("");
    setExpired(0);
  }

  return (
    <LoginContext.Provider
      value={{
        id,
        login,
        logout,
        hasAccess,
        isLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
