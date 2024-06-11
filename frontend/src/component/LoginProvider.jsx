import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [expired, setExpired] = useState(0);
  const [nickName, setNickName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");

  const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const kakaoUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const [isKakaoLogined, setIsKakaoLogined] = useState(false);

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
    setPicture(payload.picture);
    setEmail(payload.email);
  }

  function kakaoLogin(data) {
    localStorage.setItem("access_token", data.access_token);
    setExpired(Date.now() + data.expires_in * 1000);
  }

  function logout() {
    axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    setId("");
    setExpired(0);
    setNickName("");
    setPicture("");
    setEmail("");
  }

  return (
    <LoginContext.Provider
      value={{
        id,
        nickName,
        picture,
        email,
        login,
        logout,
        hasAccess,
        isLoggedIn,
        kakaoKey,
        kakaoUri,
        kakaoLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
