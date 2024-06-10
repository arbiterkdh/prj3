import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [expired, setExpired] = useState(0);
  const [nickName, setNickName] = useState("");
  const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const kakaoUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

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
    setNickName(payload.nickName);
  }

  function logout() {
    localStorage.removeItem("token");
    setId("");
    setExpired(0);
    setNickName("");
  }

  function kakaoLogin(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
  }

  return (
    <LoginContext.Provider
      value={{
        kakaoKey,
        kakaoUri,
        id,
        nickName,
        login,
        logout,
        hasAccess,
        isLoggedIn,
        kakaoLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
